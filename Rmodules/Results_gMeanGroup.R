##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")



path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
# arg <- c("Torsten", "Simple_Cattle", "Simple_Cattle2")
user <- arg[1]
filename <- arg[2:length(arg)]
#cohorts <- fromJSON(arg[3])

gMeanTotal <- list()
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
  newer <- as.numeric(check_time[,4])>=as.numeric(check_time[original,4])
  filesnames <- filesnames[newer]
  filesnames <- gsub(".RData","",filesnames)
  filesnames <- gsub(paste0(user,"_",filename[project]), "", filesnames)

  avail <- suppressWarnings(unique(c(NA,as.numeric(filesnames)))[-1])

  if(length(avail)>1){
    gMean <- list()
    for(index in avail){
      load(paste(path,user,"_",filename, index, ".RData",sep=""))
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
write.table(json, file=paste(path,user,"_","Compare_","gMean.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)




