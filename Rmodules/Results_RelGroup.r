##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")



path <- "./Rmodules/UserScripts/"

# 	var command = "nohup R --file=Rmodules/Results_RelGroup.r --args 'Torsten' 'Rinderbeispiel_v3,Rinderbeispiel_v3_BVE' 'calf+' '1';

arg <- commandArgs(TRUE)
# arg <- c("Torsten", "Simple_Cattle,Simple_Cattle2")
# arg <- c("Torsten", "123Simple_Cattle,456Simple_Cattle")
# arg <- c("Torsten", "Base-line,ssBLUP_BVE,pedigree_BVE,Short_GInterval,Low_SelectionIntensity,Change_IndexWeigths", "calf+", 5)
user <- arg[1]
#filename <- arg[2:length(arg)]
filename <- unlist(strsplit(arg[2], split=","))
filter <- arg[3]
if(is.na(filter) || filter == "undefined"){
  filter <- ""
}
max_rep <- as.numeric(arg[4])

save(file="test.RData", list=c("arg"))
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

ttttt <- 0
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

  if(!is.na(max_rep) && max_rep<length(avail)){
    avail <- sample(avail, max_rep)
  }
  varkinship1 <- NULL
  varinbreed1 <- NULL
  if(length(avail)>1){
    for(index in avail){
      print(index)
      load(paste(path,user,"_",filename[project], index, ".RData",sep=""))
      ttkinship <- NULL
      ncore <- min(10, nrow(coh))
      doParallel::registerDoParallel(cores=ncore)
      library(doParallel)
      ttkinship <- foreach::foreach(rep=1:nrow(coh), .packages = "MoBPS", .combine = "rbind") %dopar% {
        if((as.numeric(coh[rep,3]) + as.numeric(coh[rep,4]) > 1)&& (nchar(filter)<3 || ttnames[rep]==filter)){
          out <- kinship.emp.fast(population=population, cohorts=coh[rep,1],ibd.obs = 100, hbd.obs = 50)
        }else{
          out <- c(0,0.5)
        }
        out
      }


      doParallel::stopImplicitCluster()
      if(index==avail[1]){
        ttkinship1 <- ttkinship / length(avail)
        varkinship1 <- ttkinship[,1]
        varinbreed1 <- ttkinship[,2]
      } else{
        ttkinship1 <- ttkinship1 + ttkinship / length(avail)
        varkinship1 <- cbind(varkinship1, ttkinship[,1])
        varinbreed1 <- cbind(varinbreed1, ttkinship[,2])
      }

      ttttt <- ttttt + 1
      save(file="compare_stand.RData", list=c("ttttt"))

    }
    ttkinship <- ttkinship1

  } else{
    ttkinship <- NULL

    ncore <- min(10, nrow(coh))
    doParallel::registerDoParallel(cores=ncore)
    library(doParallel)
    ttkinship <- foreach::foreach(rep=1:nrow(coh), .packages = "MoBPS", .combine = "rbind") %dopar% {
      if((as.numeric(coh[rep,3]) + as.numeric(coh[rep,4]) > 1) && (nchar(filter)<3 || ttnames[rep]==filter)){
        out <- kinship.emp.fast(population=population, cohorts=coh[rep,1],ibd.obs = 100, hbd.obs = 25)
      }else{
        out <- c(0,0.5)
      }
      out
    }
    doParallel::stopImplicitCluster()
    ttttt <- ttttt + 1
    save(file="compare_stand.RData", list=c("ttttt"))

  }

  if(length(varkinship1)==0){
    sdkin <- sdinb <- rep(0, length(ttrep))
  } else{
    sdkin <- sqrt(diag(var(t(varkinship1)))) / sqrt(length(avail))
    sdinb <- sqrt(diag(var(t(varinbreed1)))) / sqrt(length(avail))
  }

  result <- cbind(paste0(filename[project], "_", ttnames), ttrep, coh[,"time point"], round(ttkinship[,1]*2,digits=6), round(ttkinship[,2]*2-1, digits=6), sdkin, sdinb)

  colnames(result) <- c("names", "ttrep", "tttime", "kin", "inb", "sdkin", "sdinb")
  resultsTotal <- rbind(resultsTotal, result)
}





result <- resultsTotal

#dat <- by(result, result[,1], t)
#class(dat) <- "list"

dat <- by(result, result[,1], t)
class(dat) <- "list"

json <- as.character(toJSON(dat))

write.table(json, file=paste(path,user,"_","Compare_","RelGroup.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)




