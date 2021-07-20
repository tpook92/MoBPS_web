

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
library("ulimit")


path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)


dat <- try(fromJSON(arg[2], simplifyVector=FALSE))
# dat <- jsonlite::read_json(path="/home/nha/PigCross.json")
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

write_json(dat, path=paste(fname, "_", paste0(substr(Sys.time(), start=1, stop=10), "_", substr(Sys.time(), start=12, stop=16)),".json",sep=""), auto_unbox =TRUE)


if(arg[1]=="undefined"){
  stop(paste0("Session ", "time-out! Please relog! "))
}


fileSum  <- paste(fname,"Summary.json",sep="")
#if(file.exists(fileSum)){
#  file.remove(fileSum)
#}

memory_max <- 5000
if(dat$'Class'==2){
  time.check <- TRUE
  time.max <- 4 * 60 * 60
  memory_max <- 20000
} else if(dat$'Class'==3){
  time.check <- TRUE
  time.max <- 48 * 60 * 60
  memory_max <- 30000
} else if(dat$'Class'==4){
  time.check <- TRUE
  time.max <- 120 * 60 * 60
  memory_max <- 40000
}

memory_limit(memory_max)





  t1 <- Sys.time()
  population <- try(json.simulation(total=dat, skip.population = TRUE))
  if("try-error" %in% is(population)){
    print(population)
    stop("Cannot Simulate Project!")
  }

  time_file <- population[[2]]
  time_file_temp <- as.matrix(time_file[,2:4])
  storage.mode(time_file_temp) <- "numeric"
  time_file <- rbind(c("TOTAL", colSums(time_file_temp)),time_file)

  colnames(time_file) <- c("Cohort name", "BVEtime", "Gentime", "Totaltime")
  write.csv(file=paste0(fname, "_time.csv"), time_file, row.names = FALSE, quote=FALSE)
  write.csv(file=paste0(fname, ".csv"), population[[1]], row.names = FALSE, quote=FALSE)

  t2 <- Sys.time()
  cat(paste0("Finished simulation.\n"))
  cat(paste0("Simulation took ", round(as.numeric(t2)-as.numeric(t1), digit=3), " seconds.\n"))




################################################################################
################ Simulation time estimation without Errors ##############################
################################################################################





