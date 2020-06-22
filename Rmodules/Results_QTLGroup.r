##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")



path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
# arg <- c("Torsten", "Simple_Cattle,Simple_Cattle2")
# arg <- c("Torsten", "123Simple_Cattle,456Simple_Cattle")
user <- arg[1]
#filename <- arg[2:length(arg)]
filename <- unlist(strsplit(arg[2], split=","))
#cohorts <- fromJSON(arg[3])
trait <- fromJSON(arg[3], simplifyVector=FALSE)

max_rep <- as.numeric(arg[4])

resultTotal <- list()

join_summary <- list()
for(project in 1:length(filename)){
  temp1 <- read_json(paste(path,user,"_",filename[project],"Summary.json",sep=""))
  for(index in 1:length(temp1)){
    join_summary[[length(join_summary)+1]] <- temp1[[index]]
    names(join_summary)[length(join_summary)] <- paste0(filename[project],"_",names(temp1)[index])
  }
}

write_json(join_summary, path=paste0(path,user,"_Compare_Summary.json"))

ttttt <- 1

for(project in 1:length(filename)){
  load(paste(path,user,"_",filename[project],".RData",sep=""))
  # Rel

  coh <- get.cohorts(population, extended=TRUE)
  ttnames <- NULL
  ttrep <- NULL
  tttime <- NULL
  for(nn in coh[,1]){
    nn_s <- strsplit(nn, "_")[[1]]
    if(!is.na(as.numeric(nn_s[length(nn_s)]))){
      ttnames <- c(ttnames, paste(nn_s[-length(nn_s)],collapse="_" ))
      ttrep <- c(ttrep, as.numeric(nn_s[length(nn_s)]))
      tttime <- c(tttime, as.numeric(get.time.point(population, cohorts=nn)[1]))
    }else{
      ttnames <- c(ttnames, nn)
      ttrep <- c(ttrep, 0)
      tttime <- c(tttime, as.numeric(get.time.point(population, cohorts=nn)[1]))
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

  result <- list()

  if(length(avail)>1){

    result1 <- list()
    for(index in avail){
      result <- list()
      cat(index)
      load(paste(path,user,"_",filename, index, ".RData",sep=""))
      for(tr in 1:length(trait)){
        result[[trait[[tr]][['Trait Name']]]] <- list()
        check <- try(length(trait[[tr]][["Trait QTL Info"]] )!= 0)
        print(check)
        if(!("try-error" %in% is(check)) & check == TRUE){
          for(qtl in 1:length(trait[[tr]][["Trait QTL Info"]])){
            snp <-  population$info$real.bv.add[[tr]][qtl,]
            ttfreq <- analyze.population(population, snp[2], snp[1], cohorts=coh[,1])
            freq <- (ttfreq[3,]+ttfreq[2,]/2)/colSums(ttfreq)
            oH <-  ttfreq[2,]/colSums(ttfreq)
            eH <- 2*freq*(1-freq)
            result[[trait[[tr]][['Trait Name']]]][[qtl]] <- by(cbind(ttnames, ttrep, freq, oH, eH, tttime), ttnames, t)
            class(result[[trait[[tr]][['Trait Name']]]][[qtl]]) <- "list"
          }
        }
      }
      if(index==avail[1]){
        result1 <- result
      } else{
        for(tr in 1:length(trait)){
          check <- try(length(trait[[tr]][["Trait QTL Info"]] )!= 0)
          print(check)
          if(!("try-error" %in% is(check)) & check == TRUE){
            for(qtl in 1:length(trait[[tr]][["Trait QTL Info"]])){
              for(coh in unique(ttnames)){
                result1[[trait[[tr]][['Trait Name']]]][[qtl]][[coh]][-1,] <- as.numeric(result1[[trait[[tr]][['Trait Name']]]][[qtl]][[coh]][-1,]) + as.numeric(result[[trait[[tr]][['Trait Name']]]][[qtl]][[coh]][-1,])
              }
            }
          }
        }
      }

    }
    for(tr in 1:length(trait)){
      check <- try(length(trait[[tr]][["Trait QTL Info"]] )!= 0)
      print(check)
      if(!("try-error" %in% is(check)) & check == TRUE){
        for(qtl in 1:length(trait[[tr]][["Trait QTL Info"]])){
          for(coh in unique(ttnames)){
            result[[trait[[tr]][['Trait Name']]]][[qtl]][[coh]][-1,] <- as.numeric(result1[[trait[[tr]][['Trait Name']]]][[qtl]][[coh]][-1,]) / length(avail)
          }
        }
      }
    }

    ttttt <- ttttt + 1
    save(file="compare_stand.RData", list=c("ttttt"))

  } else{
    for(tr in 1:length(trait)){
      result[[trait[[tr]][['Trait Name']]]] <- list()
      check <- try(length(trait[[tr]][["Trait QTL Info"]] )!= 0)
      print(check)
      if(!("try-error" %in% is(check)) & check == TRUE){
        for(qtl in 1:length(trait[[tr]][["Trait QTL Info"]])){
          snp <-  population$info$real.bv.add[[tr]][qtl,]
          ttfreq <- analyze.population(population, snp[2], snp[1], cohorts=coh[,1])
          freq <- (ttfreq[3,]+ttfreq[2,]/2)/colSums(ttfreq)
          oH <-  ttfreq[2,]/colSums(ttfreq)
          eH <- 2*freq*(1-freq)
          result[[trait[[tr]][['Trait Name']]]][[qtl]] <- by(cbind(ttnames, ttrep, freq, oH, eH, tttime), ttnames, t)
          class(result[[trait[[tr]][['Trait Name']]]][[qtl]]) <- "list"
        }
      }
    }
  }

  for(index in 1:length(result)){
    for(tt in 1:length(result[[index]])){
      if(length(result[[index]])>0){
        names(result[[index]][[tt]]) <- paste0(filename[project], "_", names(result[[index]][[tt]]))
        for(pp in 1:length(result[[index]][[tt]])){
          result[[index]][[tt]][[pp]][1,] <- paste0(filename[project], "_", result[[index]][[tt]][[pp]][1,])
        }
      }


    }

  }

  if(project==1){
    resultTotal <- result
  } else{
    for(index in 1:length(result)){
      for(tt in 1:length(result[[index]])){
        if(length(result[[index]])>0){

          for(ss in 1:length(result[[index]][[tt]])){
            resultTotal[[index]][[tt]][[length(resultTotal[[index]][[tt]])+1]] <- result[[index]][[tt]][[ss]]
          }

        }


      }

    }

  }

}





result <- resultTotal

#dat <- by(result, result[,1], t)
#class(dat) <- "list"

json <- as.character(toJSON(result))
write.table(json, file=paste(path,user,"_","Compare_","QTLGroup.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)




