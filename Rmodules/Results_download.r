##############
# Additional analyses fot plotting results: Relationship
library("MoBPS")
library("jsonlite")

test <- matrix(0, nrow=2,ncol=2)

#arg <- c("Johannes", 'compFST',  'VCF',  'malePopAoff',  '100')

path <- "./Rmodules/UserScripts/"

arg <- commandArgs(TRUE)
# arg <- c("Torsten", "Simple_Cattle","VCF", "Bull", 0)
user <- arg[1]
filename <- arg[2]
type <- arg[3]
coh <- arg[4]

if(length(arg)>4){
  rep1 <- arg[5]
  } else{
    rep1 <- 0
}




load(paste(path,user,"_",filename,".RData",sep=""))

if(coh=="ALL"){
  activ_cohort <- get.cohorts(population)
} else if(rep1==0){
  activ_cohort <- coh
} else{
  activ_cohort <- paste0(coh, "_", rep1)
}

if(type=="Phenotypes"){
  out <- get.pheno(population, cohorts=activ_cohort)
  write.table(file = paste0(path, user,"_",filename,"_temp.txt"), out, row.names=FALSE, col.names=FALSE, quote=FALSE)
} else if(type=="Genomic Values"){
  out <- get.bv(population, cohorts=activ_cohort)
  write.table(file = paste0(path, user,"_",filename,"_temp.txt"), out, row.names=FALSE, col.names=FALSE, quote=FALSE)
} else if(type=="Est. Breeding Values"){
  out <- get.bve(population, cohorts=activ_cohort)
  write.table(file = paste0(path, user,"_",filename,"_temp.txt"), out, row.names=FALSE, col.names=FALSE, quote=FALSE)
} else if(type=="Plain Genotypes"){
  out <- get.geno(population, cohorts=activ_cohort)
  write.table(file = paste0(path, user,"_",filename,"_temp.txt"), out, row.names=FALSE, col.names=FALSE, quote=FALSE)
} else if(type=="Pedigree"){
  out <- get.pedigree(population, cohorts=activ_cohort)
  write.table(file = paste0(path, user,"_",filename,"_temp.txt"), out, row.names=FALSE, col.names=FALSE, quote=FALSE)
} else if(type=="VCF"){
  get.vcf(population, cohorts=activ_cohort, path=paste0(path, user,"_",filename,"_temp"))
} else if(type=="Ped" || type=="Map"){
  get.pedmap(population, cohorts=activ_cohort, path=paste0(path, user,"_",filename,"_temp"))
}






