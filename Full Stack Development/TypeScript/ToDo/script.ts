declare const $:any; // "$" işaretini TS dosyamın herhangi bir yerinde kullanabilirim buna karışma demek.
// Örnek bir şablon
class TodoModel{
    id: number = setNewId(); //Default değer ataması yaptık.
    work: string = "";
    isCompleted: boolean = false; // Control yaptırabiliriz
    createdDate: Date = new Date(); //Tarih formatı bu şekile veriliyor
}
// Eklenen kayıtların listesi
const todos: TodoModel[] = [] // TodoModel'in bir kopyasını çıkartmış gibi düşünebiliriz. Bundan sonra değerleri buraya aktaracağım. Hangi değelerin gelebileceğini de TodoModel'in içerisindeki değerler belirliyor.

// JQuery ile yazılmış save işlemi;
    // butona id veriyoruz ardından id ye ulaşıyoruz
    // ulaştığımız id nin click olayında aşağıda verdiğimiz kodu çalıştırıyoruz.
$("#save").on("click", () => {
    const el = $("#work"); // input'a erişiyorum

    const todo = new TodoModel(); // TodoModel sınıfının özelliklerini/değerlerini kullanabilmemizi sağlıyor.
    todo.work = el.val(); // input içerisindeki değeri todo değişkenine atıyorum

    todos.push(todo); // todo da bu değeri todos'a pushluyor

    el.val(""); // input'un içini boşaltıyorum
    el.focus(); // focus fonksiyonunu çağırıyoruz

    setTRElements();
})

function setTRElements(){
    const el = $("#tbodyEl");
    let html = "";
    // For döngüsü ile kayıtların hepsini getirebiliyoruz
    for(let index in todos) {
        const todo = todos[index];

        // Tarih formatını özelleştirdim
        const date = todo.createdDate.getDate() + "." + (+(todo.createdDate.getMonth()) + 1)+ "." + todo.createdDate.getFullYear() + " " + todo.createdDate.getHours() + ":" + todo.createdDate.getMinutes();

        html += `
        <tr>
            <td>${todo.id}</td>
            <td>${todo.work}</td>
            <td>${date}</td>
            <td>${todo.isCompleted}</td>
            <td>
                <button>Delete</button>
            </td>
        </tr>`
    }

    el.html(html); // Aslında bu JQuery ifadesi normal JS deki innerHTML'e denk geliyor.
}

function setNewId(){
    return todos.length + 1;
}