$.getJSON("data.json", function(data){ // Dosya yolu alınır
    let tableBody = $("#myTable tbody"); //Bu kısım jQuery'nin seçici özelliğini kullanır. #myTable kimliğine sahip tablonun tbody (gövde) elemanını seçer. Seçilen eleman tableBody değişkenine atanır.
    $.each(data, function(index, value){ // Bu satır, jQuery'nin $.each döngüsünü kullanır. Bu döngü, data değişkeninin içindeki her bir elemanı (nesneyi) tek tek dolaşır.
    // "function(index, value) { ... }:" Bu, döngünün her iterasyonunda (her bir nesne için) çalıştırılacak olan callback fonksiyonudur.
    // index: Döngünün şu anki iterasyonunun indisidir (sırası).
    // value: Dönen nesnenin kendisidir.
        let row = "<tr>";
        row += "<td>" + value.ad + "</td>";
        row += "<td>" + value.soyad + "</td>";
        row += "<td>" + value.yas + "</td>";
        row += "</tr>";
        tableBody.append(row);
    });
});