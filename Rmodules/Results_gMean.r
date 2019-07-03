##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")



path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
user <- arg[1]
filename <- arg[2]
#cohorts <- fromJSON(arg[3])

load(paste(path,user,"_",filename,".RData",sep=""))
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

#keep <- ttnames %in% cohorts
#coh <- coh[keep,, drop=FALSE]
#ttrep <- ttrep[keep]
#ttnames <- ttnames[keep]

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

result <- gMean

#dat <- by(result, result[,1], t)
#class(dat) <- "list"

json <- as.character(toJSON(result))     
write.table(json, file=paste(path,user,"_",filename,"gMean.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)




