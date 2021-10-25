##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")



path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
# arg <- c("Simianer", "Cock_rotation_5_PCA", "10", 'New Hen1,New Hen2,New Hen3,New Hen4,New Hen5' , 'By Cohorts')
user <- arg[1]
filename <- arg[2]
active_rep <- arg[3]
active_coh <- arg[4]
col_rule <- arg[5]
#cohorts <- fromJSON(arg[3])

active_rep <- unlist(strsplit(active_rep, split=","))
active_coh <- unlist(strsplit(active_coh, split=","))

active_rep <- as.numeric(active_rep)

if(length(active_rep)>0  & is.na(active_rep)[1]){
  active_rep <- NULL
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

if(length(active_rep)>0){
  actives <- which(ttnames %in% active_coh & ttrep %in% active_rep)
} else{
  actives <- which(ttnames %in% active_coh)
}

png("temp123.png")
pca_out <- get.pca(population, cohorts=coh[actives], export.color=TRUE, coloring = if(col_rule=="By Sex"){"sex"} else{"group"})
dev.off()

database <- get.database(population, cohorts=coh[actives])

if(col_rule=="By Time Point"){
  pca_col <- get.time.point(population, database = database)
  pca_col <- as.numeric(as.factor(pca_col))
} else{
  pca_col <- pca_out[[2]]
  pca_col <- as.numeric(as.factor(pca_col))
  pca_col <- (pca_col-1)%%8 +1
}


pca_res <- pca_out[[1]][,1:2]


pca_col[pca_col==1] <- "#0000FF"
pca_col[pca_col==2] <- "#FF0000"
pca_col[pca_col==3] <- "#00FF00"
pca_col[pca_col==4] <- "#00FFFF"
pca_col[pca_col==5] <- "#FFFF00"
pca_col[pca_col==6] <- "#FF00FF"
pca_col[pca_col==7] <- "#000000"
pca_col[pca_col==8] <- "#A9A9A9"



n_coh <- numeric(length(pca_col))
n_id <- numeric(length(pca_col))
k <- 1
for(index in 1:nrow(database)){
  for(index2 in database[index,3]:database[index,4]){
    if(database[index,2]==1){
      n_coh[k] <- which((population$info$cohorts[,3] >0) & (database[index,1]==population$info$cohorts[,2]) & (index2 >= population$info$cohorts[,6]) & (index2 < (as.numeric(population$info$cohorts[,6]) + as.numeric(population$info$cohorts[,3]))))

      n_id[k] <- index2 - database[index,3]+1
    }

    if(database[index,2]==2){
      n_coh[k] <- which((population$info$cohorts[,3] ==0) & (database[index,1]==population$info$cohorts[,2]) & (index2 >= population$info$cohorts[,7]) & (index2 < (as.numeric(population$info$cohorts[,7]) + as.numeric(population$info$cohorts[,4]))))

      n_id[k] <- index2 - database[index,3]+1
    }

    k <- k + 1
  }
}

n_coh <- population$info$cohorts[n_coh,1]
n_id <- paste0(n_coh, "-", n_id)



pca_leg <- unique(cbind(n_coh, pca_col))




result <- list(cbind(pca_res, pca_col, n_id), pca_leg)


json <- as.character(toJSON(result))
write.table(json, file=paste(path,user,"_",filename,"PCA.json",sep=""), row.names=FALSE, col.names=FALSE, quote=FALSE)

