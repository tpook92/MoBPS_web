##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")



path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
# arg <- c("Torsten", "Simple_Cattle,Simple_Cattle2")
# arg <- c("Torsten", "Simple_Cattle_LowSelection,Simple_Cattle_Default,Simple_Cattle_Fat")
user <- arg[1]
#filename <- arg[2:length(arg)]
filename <- unlist(strsplit(arg[2], split=","))
#cohorts <- fromJSON(arg[3])

gMeanTotal <- list()

join_summary <- list()
resultsTotal <- NULL
for(project in 1:length(filename)){
  temp1 <- read_json(paste(path,user,"_",filename[project],"Summary.json",sep=""))
  for(index in 1:length(temp1)){
    join_summary[[length(join_summary)+1]] <- temp1[[index]]
    names(join_summary)[length(join_summary)] <- paste0(filename[project],"_",names(temp1)[index])
  }
}

write_json(join_summary, path=paste0(path,user,"_Compare_Summary.json"))

for(project in 1:length(filename)){
  load(paste(path,user,"_",filename[project],".RData",sep=""))
  # Rel

  coh <- get.cohorts(population, extended=TRUE)
  ttnames <- NULL
  ttrep <- NULL
  for(nn in coh[,1]){
    nn_s <- strsplit(nn, "_")[[1]]
    if(!is.na(as.numeric(nn_s[length(nn_s)]))){
      ttnames <- c(ttnames, paste(nn_s[-length(nn_s)],collapse="_" ))
      ttrep <- c(ttrep, as.numeric(nn_s[length(nn_s)]))
    }else{
      ttnames <- c(ttnames, nn)
      ttrep <- c(ttrep, 0)
    }
  }

  # Check if directory contains multiple simulations
  filesnames <- dir(path)
  check_time <- file.info(paste0("Rmodules/UserScripts/", filesnames))
  original <- which(filesnames==paste0(user,"_",filename[project],".RData"))
  newer <- as.numeric(check_time[,4])>=(as.numeric(check_time[original,4])-600)
  filesnames <- filesnames[newer]
  filesnames <- gsub(".RData","",filesnames)
  filesnames <- gsub(paste0(user,"_",filename[project]), "", filesnames)

  avail <- suppressWarnings(unique(c(NA,as.numeric(filesnames)))[-1])

  if(length(avail)>1){
    for(index in avail){
      print(index)
      load(paste(path,user,"_",filename, index, ".RData",sep=""))
      ttkinship <- NULL
      ncore <- min(10, nrow(coh))
      doParallel::registerDoParallel(cores=ncore)
      library(doParallel)
      ttkinship <- foreach::foreach(rep=1:nrow(coh), .packages = "MoBPS", .combine = "rbind") %dopar% {
        if(as.numeric(coh[rep,3]) + as.numeric(coh[rep,4]) > 1){
          out <- kinship.emp.fast(population=population, cohorts=coh[rep,1],ibd.obs = 100, hbd.obs = 50)
        }else{
          out <- c(0,0.5)
        }
        out
      }
      doParallel::stopImplicitCluster()
      if(index==avail[1]){
        ttkinship1 <- ttkinship / length(avail)
      } else{
        ttkinship1 <- ttkinship1 + ttkinship / length(avail)
      }


    }
    ttkinship <- ttkinship1

  } else{
    ttkinship <- NULL
    for(cc in 1:nrow(coh)){
      print(cc)
      if(as.numeric(coh[cc,3]) + as.numeric(coh[cc,4]) > 1){
        ttkinship <- rbind(ttkinship, kinship.emp.fast(population=population, cohorts=coh[cc,1],ibd.obs = 100, hbd.obs = 25))
      }else{
        ttkinship <- rbind(ttkinship, c(0,0.5))
      }
    }
  }

  result <- cbind(ttnames, ttrep, coh[,"time point"], round(ttkinship[,1]*2,digits=6), round(ttkinship[,2]*2-1, digits=6))

  resultsTotal <- rbind(resultsTotal, result)
}





result <- resultsTotal

#dat <- by(result, result[,1], t)
#class(dat) <- "list"

json <- as.character(toJSON(result))
write.table(json, file=paste(path,user,"_","Compare_","RelGroup.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)




