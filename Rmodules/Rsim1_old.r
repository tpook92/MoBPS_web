#a <- try(install.packages("jsonlite_1.6.tar.gz", repos=NULL, type="source", lib="."))
#print(a)
#a <- try(install.packages("MoBPS_1.1.6.tar.gz", repos=NULL, type="source", lib="."))

# fehlen: dMPI, breedR, synbreed, biomaRt,  doRNG

if(TRUE){
lib = "./Rmodules/lib"
ll <- library(lib=lib)$results
suc <- 1
while(suc != 0){
  suc <- 0
  for(i in 1:nrow(ll)){
    a <- try(eval(parse(text=paste("library(",ll[i,1],",lib=lib)"))))
    if("try-error" %in% is(a)){
       suc <- 1;
    }
  }
}
}
#library("MoBPS", lib = "./Rmodules/lib")
#library("jsonlite", lib = "./Rmodules/lib")
#library(RandomFieldsUtils, lib = "./Rmodules/lib")
#library(miraculix, lib = "./Rmodules/lib")


bv.development.box <- function (population, database = NULL, gen = NULL, cohorts = NULL,
    bvrow = "all", json = FALSE, display = "bv", display.selection = FALSE,
    display.reproduction = FALSE)
{
    if (length(bvrow) == 1 && bvrow == "all") {
        bvrow <- 1:population$info$bv.nr
    }
    values_total <- list()
    values <- list()
    creating.type <- list()
    time.point <- list()
    sex <- list()
    #graphics::par(mfrow = c(1, length(bvrow)))
    if (json) {
        ids <- to_plot <- numeric(length(population$info$json[[1]]))
        for (index in 1:length(ids)) {
            ids[index] <- population$info$json[[1]][[index]]$label
            if (length(population$info$json[[1]][[index]]$"BV Plot") >
                0 && sum(population$info$cohorts[, 1] == ids[index]) >
                0) {
                to_plot[index] <- population$info$json[[1]][[index]]$"BV Plot"
            }
            cohorts <- ids[which(to_plot == "Yes")]
            if (length(cohorts) == 0) {
                cohorts <- population$info$cohorts[, 1]
            }
        }
    }
    if (length(gen) > 0) {
        for (index in gen) {
            if (display == "bv") {
                values[[length(values) + 1]] <- get.bv(population,
                  gen = index)
            }
            else if (display == "bve") {
                values[[length(values) + 1]] <- get.bve(population,
                  gen = index)
            }
            else if (display == "pheno") {
                values[[length(values) + 1]] <- get.pheno(population,
                  gen = index)
            }
            time.point[[length(time.point) + 1]] <- get.time.point(population,
                gen = index)
            creating.type[[length(creating.type) + 1]] <- get.creating.type(population,
                gen = index)
            sex[[length(sex) + 1]] <- 0
        }
    }
    if (length(database) > 0) {
        for (index in 1:nrow(database)) {
            if (display == "bv") {
                values[[length(values) + 1]] <- get.bv(population,
                  database = database[index, , drop = FALSE])
            }
            else if (display == "bve") {
                values[[length(values) + 1]] <- get.bve(population,
                  database = database[index, , drop = FALSE])
            }
            else if (display == "pheno") {
                values[[length(values) + 1]] <- get.pheno(population,
                  database = database[index, , drop = FALSE])
            }
            time.point[[length(time.point) + 1]] <- get.time.point(population,
                database = database[index, , drop = FALSE])
            creating.type[[length(creating.type) + 1]] <- get.creating.type(population,
                database = database[index, , drop = FALSE])
            sex[[length(sex) + 1]] <- database[index, 2]
        }
    }
    if (length(cohorts) > 0) {
        for (index in cohorts) {
            if (display == "bv") {
                values[[length(values) + 1]] <- get.bv(population,
                  cohorts = index)
            }
            else if (display == "bve") {
                values[[length(values) + 1]] <- get.bve(population,
                  cohorts = index)
            }
            else if (display == "pheno") {
                values[[length(values) + 1]] <- get.pheno(population,
                  cohorts = index)
            }
            time.point[[length(time.point) + 1]] <- get.time.point(population,
                cohorts = index)
            creating.type[[length(creating.type) + 1]] <- get.creating.type(population,
                cohorts = index)
            sex[[length(sex) + 1]] <- 1 + (as.numeric(population$info$cohorts[population$info$cohorts[,
                1] == index, 4]) > 0)
        }
    }
    sex <- unlist(sex)
    time_plot <- 1:length(values)
    type_plot <- rep(1, length(values))
    for (index in 1:length(values)) {
        time_plot[index] <- mean(time.point[[index]])
        if (length(unique(time.point[[index]])) > 1) {
            print("More than one time point in a plotted element")
        }
    }
    for (index in 1:length(values)) {
        type_plot[index] <- stats::median(creating.type[[index]])
        if (length(unique(creating.type[[index]])) > 1) {
            print("More than one creating type in a plotted element")
        }
    }
    for (nr in bvrow) {
        time_points <- sort(unique(time_plot))
        x_axis <- length(time_points) + length(values)
        y_min <- Inf
        y_max <- -Inf
        for (index in 1:length(values)) {
            y_min <- min(y_min, values[[index]][nr, ])
            y_max <- max(y_max, values[[index]][nr, ])
        }
       # graphics::boxplot(x = c(-10^10), xlim = c(0, x_axis),
       #     ylim = c(y_min, y_max))
        pos <- 0
        pref <- 0
        label_pos <- NULL
        cohort_pos <- numeric(length(values))
        for (index in time_points) {
            for (activ_c in which(time_plot == index)) {
                #graphics::boxplot(values[[activ_c]][nr, ], add = TRUE,
                #  at = pos, width = 0.95, col = c("black", "blue",
                #    "red")[sex[activ_c] + 1])
                cohort_pos[activ_c] <- pos
                pos <- pos + 1
            }
            #graphics::abline(v = pos)
            pos <- pos + 1
            label_pos <- c(label_pos, mean(c(pref, pos - 2)))
            pref <- pos
        }
        display.names <- NULL
        if (length(gen) > 0) {
            display.names <- c(display.names, paste("Generation",
                gen))
        }
        if (length(database) > 0) {
            display.names <- c(display.names, paste0(c("M", "F")[database[,
                2]], "_", database[, 1]))
        }
        if (length(cohorts) > 0) {
            display.names <- c(display.names, cohorts)
        }
        #graphics::axis(1, at = cohort_pos, labels = display.names,
        #    las = 2)
        #graphics::axis(3, at = label_pos, label = time_points)
        edges <- population$info$json[[2]]
        for (index in 1:length(edges)) {
            if (display.selection) {
                if (edges[[index]]$"Breeding Type" == "Selection") {
                  from <- which(edges[[index]]$from == cohorts)
                  to <- which(edges[[index]]$to == cohorts)
                  if (length(from) > 0 && length(to) > 0) {
                    #graphics::lines(c(cohort_pos[from], cohort_pos[to]),
                     # c(stats::median(values[[from]][nr, ]),
                     #   stats::median(values[[to]][nr, ])), col = "green",
                     # lwd = 2)
                  }
                }
            }
            if (display.reproduction) {
                if (edges[[index]]$"Breeding Type" == "Reproduction") {
                  from <- which(edges[[index]]$from == cohorts)
                  to <- which(edges[[index]]$to == cohorts)
                  if (length(from) > 0 && length(to) > 0) {
                    #graphics::lines(c(cohort_pos[from], cohort_pos[to]),
                     # c(stats::median(values[[from]][nr, ]),
                     #   stats::median(values[[to]][nr, ])), col = "orange",
                     # lwd = 2)
                  }
                }
            }
        }
    }
    names(values) <- display.names
    return(list(val=values, tt=time_plot))
}


kinship.development1 <- function (population, database = NULL, gen = NULL, cohorts = NULL,
    json = FALSE, ibd.obs = 50, hbd.obs = 10, display.cohort.name = FALSE,
    display.time.point = FALSE, equal.spacing = FALSE, time_reorder = FALSE)
{
    if (json) {
        ids <- to_plot <- numeric(length(population$info$json[[1]]))
        for (index in 1:length(ids)) {
            ids[index] <- population$info$json[[1]][[index]]$label
            if (length(population$info$json[[1]][[index]]$"BV Plot") >
                0) {
                to_plot[index] <- population$info$json[[1]][[index]]$"BV Plot"
            }
            cohorts <- ids[which(to_plot == "Yes")]
            if (length(cohorts) == 0) {
                cohorts <- population$info$cohorts[, 1]
            }
        }
    }
    inbred <- NULL
    time.point <- list()
    if (length(gen) > 0) {
        for (index in gen) {
            inbred <- rbind(inbred, kinship.emp.fast(population = population,
                gen = index, ibd.obs = ibd.obs, hbd.obs = hbd.obs))
            time.point[[length(time.point) + 1]] <- get.time.point(population,
                gen = index)
        }
    }
    if (length(database) > 0) {
        for (index in 1:nrow(database)) {
            inbred <- rbind(inbred, kinship.emp.fast(population = population,
                database = database[index, 1:2, drop = FALSE],
                ibd.obs = ibd.obs, hbd.obs = hbd.obs))
            time.point[[length(time.point) + 1]] <- get.time.point(population,
                database = database[index, , drop = FALSE])
        }
    }
    if (length(cohorts) > 0) {
        for (index in cohorts) {
            inbred <- rbind(inbred, kinship.emp.fast(population = population,
                cohorts = index, ibd.obs = ibd.obs, hbd.obs = hbd.obs))
            time.point[[length(time.point) + 1]] <- get.time.point(population,
                cohorts = index)
        }
    }
    time_plot <- 1:nrow(inbred)
    if (display.time.point) {
        for (index in 1:nrow(inbred)) {
            time_plot[index] <- mean(time.point[[index]])
            if (length(unique(time.point[[index]])) > 1) {
                print("More than one time point in a plotted element")
            }
        }
    }
    if (time_reorder) {
        reorder <- sort(time_plot, index.return = TRUE)$ix
    }
    else {
        reorder <- 1:length(time_plot)
    }
    if (equal.spacing) {
        xlabel <- time_plot
        time_plot <- 1:length(time_plot)
    }
    if (display.cohort.name) {
        #graphics::par(mar = c(8.1, 4.1, 2.1, 0.1))
    }
    else {
        #graphics::par(mar = c(4.1, 4.1, 2.1, 0.1))
    }
    #graphics::plot(time_plot[reorder], inbred[reorder, 1], main = paste("Kinship development"),
    #    xaxt = if (display.cohort.name || equal.spacing) {
    #        "n"
    #    }
    #    else {
    #        NULL
    #    }, xlab = if (display.cohort.name) {
    #        ""
    #    }
    #    else {
    #        "time"
    #    }, ylim = c(0, 1), col = "red", lwd = 2, type = "l",
    #    ylab = "")
    #graphics::lines(time_plot[reorder], inbred[reorder, 2], main = paste("Kinship development"),
    #    lwd = 2, col = "blue")
    if (equal.spacing && !display.cohort.name) {
        #graphics::axis(1, at = time_plot, labels = xlabel)
    }
    if (display.cohort.name) {
        display.names <- NULL
        if (length(gen) > 0) {
            display.names <- c(display.names, paste("Generation",
                gen))
        }
        if (length(database) > 0) {
            display.names <- c(display.names, paste0(c("M", "F")[database[,
                2]], "_", database[, 1]))
        }
        if (length(cohorts) > 0) {
            display.names <- c(display.names, cohorts)
        }
        display.names <- display.names
        #graphics::axis(1, at = time_plot, labels = display.names,
        #    las = 2)
        row.names(inbred) <- display.names
    }
    #graphics::legend("topleft", c("IBD", "HBD"), lty = c(1, 1),
    #    col = c("red", "blue"), lwd = c(2, 2))
    return(inbred)
}

path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)

#jsonfile <- scan(arg, what="character", sep="\n")
dat <- try(fromJSON(arg[2], simplifyVector=FALSE))
if("try-error" %in% is(dat)){
  print(dat)
  stop("Error: Cannot Read JSON file!")
}

fname <- try(dat$'Genomic Info'$'Project Name')
if("try-error" %in% is(fname)){
  print(fname)
  stop("Error: Cannot Read File Name!")
}

fname <- paste(path, arg[1],"_",fname, sep="")

if(file.exists(paste(fname, "KS.json",sep=""))){
  file.remove(paste(fname, "KS.json",sep=""))
}
if(file.exists(paste(fname, "BV.json",sep=""))){
  file.remove(paste(fname, "BV.json",sep=""))
}

population <- try(json.simulation(total=dat))
if("try-error" %in% is(population)){
  print(population)
  stop("Error: Cannot Simulate Project!")
}

            
bve <- (bv.development.box(population, json=TRUE))    

ttnames <- NULL
for(nn in names(bve$val)){
  nn_s <- strsplit(nn, "_")[[1]]
  if(!is.na(as.numeric(nn_s[length(nn_s)]))){
    ttnames <- c(ttnames, paste(nn_s[-length(nn_s)],collapse="_" ))
  }else{
    ttnames <- c(ttnames, nn)
  }
}
bve$ttnames <- ttnames
ks <- (kinship.development1(population, json=TRUE))   

json <- as.character(toJSON(bve))     
write.table(json, file=paste(fname, "BV.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)


    
ks <- cbind(names(bve$val),ks)
json <- as.character(toJSON(ks))     
write.table(json, file=paste(fname, "KS.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)

a <- try(save(population, file=paste(fname, ".RData",sep="")))
if("try-error" %in% is(a)){
  print(a)
} 

################



























