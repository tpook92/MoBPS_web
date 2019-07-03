##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")


path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
user <- arg[1]
filename <- arg[2]

load(paste(path,user,"_",filename,".RData",sep=""))
# Rel

coh <- get.cohorts(population, extended=TRUE)
print(coh)
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

ttkinship <- NULL
for(cc in 1:nrow(coh)){
  if(as.numeric(coh[cc,3]) + as.numeric(coh[cc,4]) > 1){
    ttkinship <- rbind(ttkinship, kinship.emp.fast(population=population, cohorts=coh[cc,1],ibd.obs = 50, hbd.obs = 50)) 
  }else{
    ttkinship <- rbind(ttkinship, c(0,0.5))
  }
}

result <- cbind(ttnames, ttrep, coh[,"time point"], round(ttkinship[,1]*2,digits=6), round(ttkinship[,2]*2-1, digits=6))

dat <- by(result, result[,1], t)
class(dat) <- "list"

json <- as.character(toJSON(dat))     
write.table(json, file=paste(path,user,"_",filename,"Rel.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)




