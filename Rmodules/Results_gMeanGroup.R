##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")



path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
# arg <- c("Torsten", "Simple_Cattle,Simple_Cattle2")
# arg <- c("Torsten", "Base-line,ssBLUP_BVE,pedigree_BVE,Short_GInterval,Low_SelectionIntensity,Change_IndexWeigths", "undefined", 1)
user <- arg[1]
#filename <- arg[2:length(arg)]
filename <- unlist(strsplit(arg[2], split=","))
#cohorts <- fromJSON(arg[3])

max_rep <- as.numeric(arg[4])

gMeanTotal <- list()

join_summary <- list()
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

  if(length(avail)>1){
    gMean <- list()
    for(index in avail){
      load(paste(path,user,"_",filename[project], index, ".RData",sep=""))
      for(i in 1:nrow(coh)){
        ani <- NULL
        if(coh[i,3] != 0){
          ani <- cbind(ani, population$breeding[[as.numeric(coh[i,2])]][[7]][,as.numeric(coh[i,6]):(as.numeric(coh[i,6])+as.numeric(coh[i,3])-1), drop=FALSE])
        }
        if(coh[i,4] != 0){
          ani <- cbind(ani, population$breeding[[as.numeric(coh[i,2])]][[8]][,as.numeric(coh[i,7]):(as.numeric(coh[i,7])+as.numeric(coh[i,4])-1), drop=FALSE])
        }
        if(length(gMean[[ttnames[i]]][[as.character(ttrep[i])]])==0){
          gMean[[ttnames[i]]][[as.character(ttrep[i])]] <- list(ttime=coh[i,"time point"],tval=rowMeans(ani))
        } else{
          gMean[[ttnames[i]]][[as.character(ttrep[i])]] <- list(ttime=coh[i,"time point"],tval=cbind(gMean[[ttnames[i]]][[as.character(ttrep[i])]]$tval, rowMeans(ani)))
        }

      }
      ttttt <- ttttt + 1
      save(file="compare_stand.RData", list=c("ttttt"))
    }

  } else{
    gMean <- list()
    for(i in 1:nrow(coh)){
      ani <- NULL
      if(coh[i,3] != 0){
        ani <- cbind(ani, population$breeding[[as.numeric(coh[i,2])]][[7]][,as.numeric(coh[i,6]):(as.numeric(coh[i,6])+as.numeric(coh[i,3])-1), drop=FALSE])
      }
      if(coh[i,4] != 0){
        ani <- cbind(ani, population$breeding[[as.numeric(coh[i,2])]][[8]][,as.numeric(coh[i,7]):(as.numeric(coh[i,7])+as.numeric(coh[i,4])-1), drop=FALSE])
      }
      gMean[[ttnames[i]]][[as.character(ttrep[i])]] <- list(ttime=coh[i,"time point"],tval=ani)
    }
    ttttt <- ttttt + 1
    save(file="compare_stand.RData", list=c("ttttt"))
  }

  for(addon in 1:length(gMean)){
    gMeanTotal[[length(gMeanTotal)+1]] <- gMean[[addon]]
    names(gMeanTotal)[length(gMeanTotal)] <- paste0(filename[project],"_",  names(gMean)[addon])
  }
}





result <- gMeanTotal

#dat <- by(result, result[,1], t)
#class(dat) <- "list"

json <- as.character(toJSON(result))
write.table(json, file=paste(path,user,"_","Compare_","gMeanGroup.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)




