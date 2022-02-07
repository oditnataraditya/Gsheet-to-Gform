var ssID = "https://docs.google.com/spreadsheets/d/1KQpETK0SsKZ8VPG0pyrmGVPaypOA4sNjIAAf4hzlDLo/edit?resourcekey#gid=1662200638" // URL SPREADSHEET
var formID = "https://docs.google.com/forms/d/1f4aZH1vf8Y6KlQFeoEhqeU31op5MJa9d2ZD2Kd2qzoA/edit" // URL GFORM

var wsData = SpreadsheetApp.openByUrl(ssID).getSheetByName("Pertanyaan_Jawaban"); // NAMA WORKSHEET 
var form = FormApp.openByUrl(formID);

var desc = "MATA KULIAH  : PENDIDIKAN BUDAYA ANTI KORUPSI\nHARI/TANGGAL  : SENIN, 14 PEBRUARI 2022\nBOBOT  : 2 SKS\nWAKTU  : 08.00 – 09.40\nTINGKAT/SEMESTER  : I / II\nPROGRAM  : D-III KEPERAWATAN REGULER" // DESKRIPSI, UNTUK 'ENTER' GUNAKAN \n
var judul = "2022 - UTS PBAK" // JUDUL GFORM

function setGoogleForm() {
  form.setIsQuiz(true);
  // form.setRequireLogin(true); // INI UNTUK AKUN GOOGLE WORKSPACE SAJA, KALAU UNTUK AKUN BIASA TIDAK BISA
  form.setShuffleQuestions(true);
  form.setCollectEmail(true);
  form.setCustomClosedFormMessage("Sorry ulangannya sudah kelar ya kakak-kakak");
  form.setLimitOneResponsePerUser(true);
  form.setDescription(desc);
  form.setTitle(judul);
}

function dataDiri () {
  var nama =  form.addParagraphTextItem();
  nama.setTitle("Nama Anda");
  nama.setRequired(true);
  
  var nim =  form.addParagraphTextItem();
  nim.setTitle("NIM Anda");
  nim.setRequired(true);
  
  form.addPageBreakItem().setTitle("Selamat Mengerjakan");
} // PERTANYAAN DATA DIRI DISESUAIKAN DENGAN KEBUTUHAN

function addQuestion () {
  var pertanyaan = form.addMultipleChoiceItem();
  pertanyaan.setTitle("PLACEHOLDER TEXT");
  pertanyaan.setChoices([
    pertanyaan.createChoice("PLACEHOLDER OPTION",true)]);
  pertanyaan.setPoints(1);
  pertanyaan.setRequired(true)
} // MENAMBAHKAN AITEM PERTANYAAN, PERLU SETTING MANUAL UNTUK ACAK OPSI JAWABAN

function idPertanyaantodupli () {
  var itemToDupli = form.getItems()[3]; // ANGKA DISESUAIKAN DENGAN JUMLAH AITEM (INCLD PAGEBREAK)
  var labels = wsData.getRange(1,1,1,wsData.getLastColumn()-1).getValues()[0];
  labels.forEach(function(i){
    let y = 0
    do {
      y +=1
      itemToDupli.duplicate()
    }
    while (y < i)
  });
} // SETELAH OPSI ACAK JAWABAN DIAKTIFKAN, DIDUPLIKASIKAN SEJUMLAH SOAL 

function main () {
  var labels = wsData.getRange(1,1,1,wsData.getLastColumn()).getValues()[0];
  updateBerdasarkanPosisi(labels);
} // MEMPERBAHARUI SEMUA PERTANYAAN (FUNCTION TERAKHIR DI RUN)


function updateBerdasarkanPosisi (title) {
  var len = form.getItems().length;
  var items = form.getItems().slice(3,len+1); // x pada SLICE (x, y) DISAMAKAN DENGAN ANGKA PADA VAR itemToDupli DIATAS
  let i = 0;
  do {
    var opsi = wsData
                .getRange(2, i+1, wsData.getLastRow()-1, 1)
                .getValues()
                .map(function(o){return o[0]});
    var pertanyaan = items[i].asMultipleChoiceItem();
    pertanyaan.setTitle(title[i]);
    pertanyaan.setChoices([
    pertanyaan.createChoice(opsi[0],true),
    pertanyaan.createChoice(opsi[1],false),
    pertanyaan.createChoice(opsi[2],false),
    pertanyaan.createChoice(opsi[3],false),
    pertanyaan.createChoice(opsi[4],false)]);
    i++;
  }
  while (i<items.length);
}




