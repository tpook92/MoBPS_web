##############
# Additional analyses fot plotting results:  QTL
library("MoBPS")
library("jsonlite")


path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
user <- arg[1]
filename <- arg[2]
trait <- fromJSON(arg[3], simplifyVector=FALSE)


load(paste(path,user,"_",filename,".RData",sep=""))
# QTL

coh <- get.cohorts(population)
ttnames <- NULL
ttrep <- NULL
for(nn in coh){
  nn_s <- strsplit(nn, "_")[[1]]
  if(!is.na(as.numeric(nn_s[length(nn_s)]))){
    ttnames <- c(ttnames, paste(nn_s[-length(nn_s)],collapse="_" ))
    ttrep <- c(ttrep, as.numeric(nn_s[length(nn_s)]))
  }else{
    ttnames <- c(ttnames, nn)
    ttrep <- c(ttrep, 0)
  }
}

result <- list()
for(tr in 1:length(trait)){
  result[[trait[[tr]][['Trait Name']]]] <- list()
  check <- try(length(trait[[tr]][["Trait QTL Info"]] )!= 0)
  print(check)
  if(!("try-error" %in% is(check)) & check == TRUE){
    for(qtl in 1:length(trait[[tr]][["Trait QTL Info"]])){
      snp <-  population$info$real.bv.add[[tr]][qtl,]
      ttfreq <- analyze.population(population, snp[2], snp[1], cohorts=coh)
      freq <- (ttfreq[3,]+ttfreq[2,]/2)/colSums(ttfreq)
      oH <-  ttfreq[2,]/colSums(ttfreq)
      eH <- 2*freq*(1-freq)
      result[[trait[[tr]][['Trait Name']]]][[qtl]] <- by(cbind(ttnames, ttrep, freq, oH, eH), ttnames, t)
      class(result[[trait[[tr]][['Trait Name']]]][[qtl]]) <- "list"
    }
  }
}

json <- as.character(toJSON(result))     
write.table(json, file=paste(path,user,"_",filename,"QTL.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)








