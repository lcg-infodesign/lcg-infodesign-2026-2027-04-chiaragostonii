let data;
let selezionata;
let selezionataNormale;

let margin = 20;
let d = 0 // diametro cerchi

let altezzaLegenda = 250;

async function setup(){
    data = await loadTable("assets/tipi-di-uva-per-tipi-di-vino.csv", ",", "header");

    // console.log('dati: ', data)

    createCanvas(windowWidth, windowHeight);
    let parametri = getURLParams();
    selezionata = parametri.Territorio;
    // console.log(selezionata)
    selezionataNormale = decodeURIComponent(selezionata);
    // console.log(selezionataNormale)

    d = (windowWidth - (margin*2))/100; //diametro cerchi
    
}

function draw(){
    background('#EBD2AD');
    noStroke();

//scrivo legenda
  fill(0);
  textSize(48);
  text("Coltivazioni di uva da vino in Italia", 20, 60);
  textSize(24);
  text("Superfici e produzioni nella provincia di ", 20, 100);
  textSize(18);
  text("Produzione totale (quintali): quantità di chicchi d'uva", 20, 140);
  textSize(18);
  text("Superficie totale (ettari): scala colore", 20, 160);

  //disegno rettangoli scala colore legenda
  fill('#8d257c')
  rect(20, 180, 20);
    fill('#6f4687')
  rect(40, 180, 20);
      fill('#725f8b')
  rect(60, 180, 20);
      fill('#75778d')
  rect(80, 180, 20);
      fill('#778d8f')
  rect(100, 180, 20);
      fill('#79a490')
  rect(120, 180, 20);
      fill('#7abb90')
  rect(140, 180, 20);
      fill('#7cd28f')
  rect(160, 180, 20);
      fill('#7fe88d')
  rect(180, 180, 20);
      fill('#82ff8a')
  rect(200, 180, 20);

    let produzioneDop = 0;
    let produzioneIgp = 0;
    let produzioneAltro = 0;

    let superficieDop = 0;
    let superficieIgp = 0;
    let superficieAltro = 0;

    //scala di colori utilizzati per la superficie
    let colorScale = {
        10:'#8d257c',
        20: '#6f4687',
        30: '#725f8b',
        40: '#75778d',
        50: '#778d8f',
        60: '#79a490',
        70: '#7abb90',
        80: '#7cd28f',
        90: '#7fe88d',
        100: '#82ff8a',
    }

    let rigaSelezionata = data.findRow(selezionataNormale, "Territorio");
    // console.log('riga selezionata: ', rigaSelezionata)
        let nomePaese = rigaSelezionata.getString("Territorio");

//getString perchè sennò non prende in considerazione le caselle vuote del csv
    let stringSuperficieDop = rigaSelezionata.getString("Superficie totale - ettari - Uve per vini dop");
    let stringSuperficieIgp = rigaSelezionata.getString("Superficie totale - ettari - Uve per vini igp");
    let stringSuperficieAltro = rigaSelezionata.getString("Produzione totale - quintali - Uve per altri vini (escluso dop e igp)");


    let stringProduzioneDop = rigaSelezionata.getString("Produzione totale - quintali - Uve per vini dop");
    if(stringProduzioneDop != "") {
        produzioneDop = rigaSelezionata.getNum("Produzione totale - quintali - Uve per vini dop");
        superficieDop = rigaSelezionata.getNum("Superficie totale - ettari - Uve per vini dop");
    }

    let stringProduzioneIgp = rigaSelezionata.getString("Produzione totale - quintali - Uve per vini igp");
    if(stringProduzioneIgp != ""){
        produzioneIgp = rigaSelezionata.getNum("Produzione totale - quintali - Uve per vini igp");
        superficieIgp = rigaSelezionata.getNum("Superficie totale - ettari - Uve per vini igp");
    }

    let stringProduzioneAltro = rigaSelezionata.getString("Produzione totale - quintali - Uve per altri vini (escluso dop e igp)")
    if(stringProduzioneAltro != ""){
        produzioneAltro = rigaSelezionata.getNum("Produzione totale - quintali - Uve per altri vini (escluso dop e igp)");
        superficieAltro = rigaSelezionata.getNum("Superficie totale - ettari - Uve per altri vini (escluso dop e igp)");
    }

    //calcolo il totale della produzione
    let totaleProduzione = produzioneDop + produzioneIgp + produzioneAltro;

    //calcolo le percentuali delle produzioni dei tre tipi di vino
    let percDop = round((produzioneDop/totaleProduzione) *100);
    let percIgp = round((produzioneIgp/totaleProduzione) *100);
    let percAltro = 100 - (percDop + percIgp);

    //calcolo il totale della superficie
    let totaleSuperficie = superficieDop + superficieIgp + superficieAltro;

    //calcolo le percentuali delle superfici dei tre tipi di vino
    let percSupDop = round((superficieDop/totaleSuperficie) *100);
    let percSupIgp = round((superficieIgp/totaleSuperficie) *100);
    let percSupAltro = 100 - (percSupDop + percSupIgp);
    console.log(totaleProduzione)
    console.log(produzioneDop)
    console.log(produzioneIgp)
    console.log(produzioneAltro)

    console.log(percDop)
    console.log(percIgp)
    console.log(percAltro)

    let xIniziale = margin + (d/2);
    let x = xIniziale;
    let y=altezzaLegenda+100;
    let y1 = y + 150;
    let y2 = y1 + 150;
    
//collego i colori di colorscale alle percentuali Dop
    if(percSupDop<10){
      fill(colorScale[10])
    }else if(percSupDop>10 && percSupDop<20){
      fill(colorScale[20])
    }else if(percSupDop>20 && percSupDop<30){
      fill(colorScale[30])
    }else if(percSupDop>30 && percSupDop<40){
      fill(colorScale[40])
    }else if(percSupDop>40 && percSupDop<50){
      fill(colorScale[50])
    }else if(percSupDop>50 && percSupDop<60){
      fill(colorScale[60])
    }else if(percSupDop>60 && percSupDop<70){
      fill(colorScale[70])
    }else if(percSupDop>70 && percSupDop<80){
      fill(colorScale[80])
    }else if(percSupDop>80 && percSupDop<90){
      fill(colorScale[90])
    }else{
      fill(colorScale[100])
    }
    //disegno i chicchi di vini dop
    for(let i=0; i < percDop; i++){
        // fill(colorScale);
        circle(x, y, d);
        x+=d;
    }
    
    fill(0);
    textSize(18);
    text("Uve per vini Dop", 20, y - 70);
    textSize(14);
    text("Produzione totale (quintali): " + stringProduzioneDop, 20, y-40);
    text("Superficie totale (ettari): " + stringSuperficieDop, 20, y-20);

//collego i colori di colorscale alle percentuali Igp
    if(percSupIgp<10){
      fill(colorScale[10])
    }else if(percSupIgp>10 && percSupIgp<20){
      fill(colorScale[20])
    }else if(percSupIgp>20 && percSupIgp<30){
      fill(colorScale[30])
    }else if(percSupIgp>30 && percSupIgp<40){
      fill(colorScale[40])
    }else if(percSupIgp>40 && percSupIgp<50){
      fill(colorScale[50])
    }else if(percSupIgp>50 && percSupIgp<60){
      fill(colorScale[60])
    }else if(percSupIgp>60 && percSupIgp<70){
      fill(colorScale[70])
    }else if(percSupIgp>70 && percSupIgp<80){
      fill(colorScale[80])
    }else if(percSupIgp>80 && percSupIgp<90){
      fill(colorScale[90])
    }else{
      fill(colorScale[100])
    }
    //disegno i chicchi di vini igp
    // console.log("inizio igp: ")
    x = xIniziale;
    for(let i=0; i < percIgp; i++){
        // fill(255);
        circle(x, y1, d);
        x+=d;
    }

    fill(0);
    textSize(18);
    text("Uve per vini Igp", 20, y1 - 70);
    textSize(14);
    text("Produzione totale (quintali): " + stringProduzioneIgp, 20, y1 - 40);
    text("Superficie totale (ettari): " + stringSuperficieIgp, 20, y1 - 20);

//collego i colori di colorscale alle percentuali di Altro
    if(percSupAltro<10){
      fill(colorScale[10])
    }else if(percSupAltro>10 && percSupAltro<20){
      fill(colorScale[20])
    }else if(percSupAltro>20 && percSupAltro<30){
      fill(colorScale[30])
    }else if(percSupAltro>30 && percSupAltro<40){
      fill(colorScale[40])
    }else if(percSupAltro>40 && percSupAltro<50){
      fill(colorScale[50])
    }else if(percSupAltro>50 && percSupAltro<60){
      fill(colorScale[60])
    }else if(percSupAltro>60 && percSupAltro<70){
      fill(colorScale[70])
    }else if(percSupAltro>70 && percSupAltro<80){
      fill(colorScale[80])
    }else if(percSupAltro>80 && percSupAltro<90){
      fill(colorScale[90])
    }else{
      fill(colorScale[100])
    }
    //disegno i chicchi di vini ne dop ne igp
    x = xIniziale;
    for(let i=0; i < percAltro; i++){
        // fill(175);
        circle(x, y2, d);
        x+=d;
    }

    fill(0);
    textSize(18);
    text("Uve per vini esclusi Dop e Igp", 20, y2 - 70);
    textSize(14);
    text("Produzione totale (quintali): " + stringProduzioneAltro, 20, y2 - 40);
    text("Superficie totale (ettari): " + stringSuperficieAltro, 20, y2 - 20);

    if(x + totaleProduzione <= (windowWidth - margin)){
        x = xIniziale;
    }
}