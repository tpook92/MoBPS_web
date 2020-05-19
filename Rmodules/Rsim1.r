

###################################################################################################################
############################################# SIMULATION STARTED ##################################################
###################################################################################################################
###################################################################################################################
############################## Progress on the simulation will be provided here! ##################################
###################################################################################################################
############################ Scroll done to see the current state of the simulation! ##############################
###################################################################################################################
###################################################################################################################


#################################################################################################################
####################################### Preparation of the R enviroment  ########################################
#################################################################################################################

library("MoBPS")
library("jsonlite")

path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)


dat <- try(fromJSON(arg[2], simplifyVector=FALSE))
# dat <- jsonlite::read_json(path="Rmodules/UserScripts/Torsten_Rinderbeispiel_v3_2020-05-13_17:05.json")
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



write_json(dat, path=paste(fname, "_", paste0(substr(Sys.time(), start=1, stop=10), "_", substr(Sys.time(), start=12, stop=16)),".json",sep=""), auto_unbox =TRUE)

if(length(dat$'Genomic Info'$'advanced_parallel')>0 && dat$'Genomic Info'$'advanced_parallel'){

  ## Perform phasing
  required_phasing <- file <- NULL
  for(index in 1:length(dat$Nodes)){
    if(length(dat$Nodes[[index]]$'phasing_required')==1 && dat$Nodes[[index]]$'phasing_required' == "Yes"){
      required_phasing <- c(required_phasing, index)
      file <- c(file, dat$Nodes[[index]]$'Path')
    }
  }
  nr <- 1
  for(path in unique(file)){
    isvcf <- (substr(path, start=nchar(path)-3, stop=nchar(path))==".vcf") ||(substr(path, start=nchar(path)-3, stop=nchar(path))=="f.gz")
    pedmap.to.phasedbeaglevcf(map_path= if(!isvcf){dat$'Genomic Info'$'Own Map Path'} else{NULL},
                              ped_path = if(!isvcf){path} else{NULL},
                              vcf_path = if(isvcf){path} else{NULL},
                              db_dir=paste0("/home/nha/Plink/DB/", nr))

    for(index in required_phasing[which(file==path)]){
      dat$Nodes[[index]]$'Path' <- paste0("/home/nha/Plink/DB/", nr, "temp_vcf_phased.vcf.gz")
      dat$Nodes[[index]]$'phasing_required' <- "No"
    }
    nr <- nr + 1
  }

  ncore <- 1
  pcore <- 1

  if(length(dat$'Class')==1){
    if(length(dat$'Genomic Info'$'number-simulations-parallel')>0){
      ncore <- as.numeric(dat$'Genomic Info'$'number-simulations-parallel')
    }
    if(length(dat$'Genomic Info'$'number-simulations-core')>0){
      pcore <- as.numeric(dat$'Genomic Info'$'number-simulations-core')
    }
  }

  if(dat$'Class'==1){
    stop(paste0("No permission to run ", "simulations in R!"))
  } else if(dat$'Class'==2 && (ncore*pcore) > 5){
    stop(paste0("Simulation exceeds ", "your available ressources"))
  } else if(dat$'Class'==3 && (ncore*pcore) > 10){
    stop(paste0("Simulation exceeds ", "your available ressources"))
  } else if(dat$'Class'==4 && (ncore*pcore) > 20){
    stop(paste0("Simulation exceeds ", "your available ressources"))
  }

  doParallel::registerDoParallel(cores=ncore)
  if(length(as.numeric(dat$'Genomic Info'$'number-simulations'))==1){
    sims <- as.numeric(dat$'Genomic Info'$'number-simulations')
  } else{
    sims <- 1
  }
  library(doParallel)
  cat("\n\n\n\n\n")
  trash <- foreach::foreach(rep=1:sims, .packages = "MoBPS") %dopar% {

    if(rep==1){
      verbose <- TRUE
    } else{
      verbose <- FALSE
    }
    t1 <- Sys.time()
    cat(paste0("Start simulation number ", rep, "\n"))
    population <- try(MoBPS::json.simulation(total=dat, verbose=verbose))
    if("try-error" %in% is(population)){
      print(population)
      stop("Cannot Simulate Project!")
    }
    t2 <- Sys.time()
    if(rep==1){
      save(population, file=paste(fname, ".RData",sep=""))
      write.csv(file=paste0(fname, ".csv"), population$info$cost.data, row.names = FALSE, quote=FALSE)
    }
    save(population, file=paste(fname, rep, ".RData",sep=""))
    cat(paste0("Finished simulation number ", rep,".\n"))
    cat(paste0("Simulation took ", round(as.numeric(t2)-as.numeric(t1), digit=3), " seconds.\n"))
  }
  load(paste(fname, ".RData",sep=""))

  doParallel::stopImplicitCluster()
} else{
  t1 <- Sys.time()
  population <- try(json.simulation(total=dat))
  if("try-error" %in% is(population)){
    print(population)
    stop("Cannot Simulate Project!")
  }

  save(population, file=paste(fname, ".RData",sep=""))

  write.csv(file=paste0(fname, ".csv"), population$info$cost.data, row.names = FALSE, quote=FALSE)

  t2 <- Sys.time()
  cat(paste0("Finished simulation.\n"))
  cat(paste0("Simulation took ", round(as.numeric(t2)-as.numeric(t1), digit=3), " seconds.\n"))


  ###############################################################################
  ################# Actual simulation starts here!  #############################
  ###############################################################################
  ###############################################################################
  ######### Following prints are generated by json.simulation  ##################
  ###############################################################################
}


coh <- get.cohorts(population, extended=TRUE)
ttnames <- NULL
ttrep <- NULL
for(nn in coh[,1]){
  nn_s <- strsplit(nn, "_")[[1]]
  if(!is.na(suppressWarnings(as.numeric(nn_s[length(nn_s)])))){
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





