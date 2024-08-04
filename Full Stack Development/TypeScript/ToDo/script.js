// Örnek bir şablon
var TodoModel = /** @class */ (function () {
    function TodoModel() {
        this.id = setNewId(); //Default değer ataması yaptık.
        this.work = "";
        this.isCompleted = false; // Control yaptırabiliriz
        this.createdDate = new Date(); //Tarih formatı bu şekile veriliyor
    }
    return TodoModel;
}());
// Eklenen kayıtların listesi
var todos = []; // TodoModel'in bir kopyasını çıkartmış gibi düşünebiliriz. Bundan sonra değerleri buraya aktaracağım. Hangi değelerin gelebileceğini de TodoModel'in içerisindeki değerler belirliyor.
// JQuery ile yazılmış save işlemi;
// butona id veriyoruz ardından id ye ulaşıyoruz
// ulaştığımız id nin click olayında aşağıda verdiğimiz kodu çalıştırıyoruz.
$("#save").on("click", function () {
    var el = $("#work"); // input'a erişiyorum
    var todo = new TodoModel(); // TodoModel sınıfının özelliklerini/değerlerini kullanabilmemizi sağlıyor.
    todo.work = el.val(); // input içerisindeki değeri todo değişkenine atıyorum
    todos.push(todo); // todo da bu değeri todos'a pushluyor
    el.val(""); // input'un içini boşaltıyorum
    el.focus(); // focus fonksiyonunu çağırıyoruz
    setTRElements();
});
function setTRElements() {
    var el = $("#tbodyEl");
    var html = "";
    // For döngüsü ile kayıtların hepsini getirebiliyoruz
    // Not: Burada dikkat edilmesi gereken bir nokta var. Burada tanımlı olan index string bir ifade bu nedenle index artışında sayıya göre değil de string'e göre bir artış olacak. Bunun önüne geçmek için index'i sayısal bir ifadeye çevirmeliyim. Bunun için de td nin içerisinde "+" işareti koymam yeterlidir.
    for (var index in todos) {
        var todo = todos[index];
        // Tarih formatını özelleştirdim
        var date = todo.createdDate.getDate() + "." + (+(todo.createdDate.getMonth()) + 1) + "." + todo.createdDate.getFullYear() + " " + todo.createdDate.getHours() + ":" + todo.createdDate.getMinutes();
        html += "\n        <tr>\n            <td>".concat(todo.id, "</td>\n            <td>").concat(todo.work, "</td>\n            <td>").concat(date, "</td>\n            <td>").concat(todo.isCompleted, "</td>\n            <td>\n                <button>Delete</button>\n            </td>\n        </tr>");
    }
    el.html(html); // Aslında bu JQuery ifadesi normal JS deki innerHTML'e denk geliyor.
}
function setNewId() {
    return todos.length + 1;
}
