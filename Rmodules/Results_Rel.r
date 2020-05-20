##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")



path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
# arg <- c("Torsten", "Simple_Cattle_Default")
user <- arg[1]
filename <- arg[2]
filter <- arg[3]
if(is.na(filter)){
  filter <- ""
}


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

filesnames <- dir(path)
check_time <- file.info(paste0("Rmodules/UserScripts/", filesnames))
original <- which(filesnames==paste0(user,"_",filename,".RData"))
newer <- as.numeric(check_time[,4])>=as.numeric(check_time[original,4])
filesnames <- filesnames[newer]
filesnames <- gsub(".RData","",filesnames)
filesnames <- gsub(paste0(user,"_",filename), "", filesnames)

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
      if(as.numeric(coh[rep,3]) + as.numeric(coh[rep,4]) > 1 && (nchar(filter)<3 || ttnames[rep]==filter)){
        out <- kinship.emp.fast(population=population, cohorts=coh[rep,1],ibd.obs = 100, hbd.obs = 25)
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

  ncore <- min(10, nrow(coh))
  doParallel::registerDoParallel(cores=ncore)
  library(doParallel)
  ttkinship <- foreach::foreach(rep=1:nrow(coh), .packages = "MoBPS", .combine = "rbind") %dopar% {
    if(as.numeric(coh[rep,3]) + as.numeric(coh[rep,4]) > 1 && (nchar(filter)<3 || ttnames[rep]==filter)){
      out <- kinship.emp.fast(population=population, cohorts=coh[rep,1],ibd.obs = 100, hbd.obs = 25)
    }else{
      out <- c(0,0.5)
    }
    out
  }
  doParallel::stopImplicitCluster()

}


result <- cbind(ttnames, ttrep, coh[,"time point"], round(ttkinship[,1]*2,digits=6), round(ttkinship[,2]*2-1, digits=6))

dat <- by(result, result[,1], t)
class(dat) <- "list"

json <- as.character(toJSON(dat))
write.table(json, file=paste(path,user,"_",filename,"Rel.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)




