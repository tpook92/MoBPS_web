
library("MoBPS")
library("jsonlite")



path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)

dat <- try(fromJSON(arg[2], simplifyVector=FALSE))
if("try-error" %in% is(dat)){
  print(dat)
  stop("Cannot Read JSON file!")
}

fname <- try(dat$'Genomic Info'$'Project Name')
if("try-error" %in% is(fname)){
  print(fname)
  stop("Cannot Read File Name!")
}

fname <- paste(path, arg[1],"_",fname, sep="")

fileSum  <- paste(fname,"Summary.json",sep="")
if(file.exists(fileSum)){
  file.remove(fileSum)
}

population <- try(json.simulation(total=dat))
if("try-error" %in% is(population)){
  print(population)
  stop("Cannot Simulate Project!")
}

save(population, file=paste(fname, ".RData",sep=""))

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

result <- as.list(table(ttnames))
for(rr in names(result)){
     result[[rr]] <- list(tfounder=(coh[rr,"creating.type"] =="0"),trep=result[[rr]])                            
}

json <- as.character(toJSON(result))     
write.table(json, file=paste(fname,"Summary.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)

################################################################################
################ Simulation success without Errors ##############################
################################################################################





