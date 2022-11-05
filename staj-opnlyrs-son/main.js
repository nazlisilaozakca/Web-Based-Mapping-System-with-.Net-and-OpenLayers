window.onload = harita; //sayfa ilk açıldığında haritayı getirir

var map;

var vectorSource = new ol.source.Vector({
    wrapX: false});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

var coordinates;

//anasayfa butonuna tıklayınca gelmesi.
var btnHomePage = document.getElementById('brand-textBtn');
btnHomePage.onclick= function(){
    window.location.reload();
}
//nokta eklemek için buton
function ekleButon() {
    
    
    var _name = document.getElementById("NameText").value; //name text değişkeninin değerini almaya çalışıyoruz. Böylece birden fazla isim eklenebilir
    const data = {
        x: coordinates[0],
        y: coordinates[1],
        name: _name
    };

    //POST FETCH
    fetch("https://localhost:7133/api/Location", { //verinin gonderilecegi url
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data), //body ozelligine gonderilecek veri yazilir

        })
        .then(response => response.json()) //promise yapisi doner
        .then(data => {
            console.log('Success:', data);
           
                if(!data.status){
                    Swal.fire(
                        'Hay aksi!',
                        'Kayıt gerçekleştirilemedi. Boş değer veya aynı değer girilemez.',
                        'error'
                    )
                    
                }
                else{Swal.fire(
                    'Başarılı',
                    'Kayıt eklendi',
                    'success') ;
                    panelYap.close();
                    window.location.reload();
                }
                
        })
        .catch((error) => {
            console.error('Error:', error);
            
        })
        

}

//silmek için fonksiyon
 function silButon() {
 var _id = document.getElementById("IdTextGuncelle").value;
 //confirm paneli alerti
  Swal.fire({
  title: 'Silmek istediğinize emin misiniz?',
  text: "Bu işlem geri alınamaz",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Evet, sil!'
}).then((result) => {
  if (result.isConfirmed) {

    //DELETE FETCH
    fetch('https://localhost:7133/api/Location?id=' + _id, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            console.log("HTTP Çalışıyor")
        } else {
            console.log("HTTP çalışmyıor")
        }
        return res
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        Swal.fire(
        'Silindi!',
        'Kayıt başarıyla silindi',
        'success'
      );
    })
    .catch(error => 
        {console.log(error);
            Swal.fire(
                'Hay aksi!',
                'Kayıt silinemedi',
                'error'
              );
    })

        guncellePanel.close();
        btnListele.onclick();
  }
})
    
}


//inreraction silmek için buton
//silmek için fonksiyon
function interactionsilButon() {
    var _id = document.getElementById("IdTextGuncelleInteraction").value;
    //confirm paneli alerti
     Swal.fire({
     title: 'Silmek istediğinize emin misiniz?',
     text: "Bu işlem geri alınamaz",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Evet, sil!'
   }).then((result) => {
     if (result.isConfirmed) {
   
       //DELETE FETCH
       fetch('https://localhost:7133/api/Location?id=' + _id, {
           method: "DELETE",
           headers: {
               'Content-type': 'application/json'
           }
       })
       .then(res => {
           if (res.ok) {
               console.log("HTTP Çalışıyor")
           } else {
               console.log("HTTP çalışmyıor")
           }
           return res
       })
       .then(res => res.json())
       .then(data => {
           console.log(data);
           
           Swal.fire(
           'Silindi!',
           'Kayıt başarıyla silindi',
           'success'
         );
         
         interactionguncellePanel.close();

         window.location.reload();
         
       })
       .catch(error => 
           {console.log(error);
               Swal.fire(
                   'Hay aksi!',
                   'Kayıt silinemedi',
                   'error'
                 );
       })

           
     }
   })
          
   }


//güncelleme için fonksiyon (güncelle butonuna tıklayınca çalışması)
function guncelleButon() {

    var _id = document.getElementById("IdTextGuncelle").value;
    var _nameGuncel = document.getElementById("NameTextGuncel").value;
    var _xGuncel = document.getElementById("xKonumGuncel").value;
    var _yGuncel = document.getElementById("yKonumGuncel").value;


    //güncelleme confirmation içinde fetch çalışır.
    Swal.fire({
        title: 'Güncellemek istediğinize emin misiniz?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, güncelle!'
      }).then((result) => {
        if (result.isConfirmed) {

    //PUT FETCH

    fetch('https://localhost:7133/api/Location?id=' + _id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id,
                x: (_xGuncel),
                y: (_yGuncel),
                name: _nameGuncel
            })
        })
        .then(res => {
            if (res.ok) {
                console.log("HTTP Çalışıyor")
    
            } else {
                console.log("HTTP çalışmyıor")
                
            }
            return res
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            Swal.fire(
                'Başarıyla Güncellendi!',
                    'Kayıt güncellendi',
                    'success'
          );
        })
        .catch(error => 
            {console.log(error);
               
        })

          //panelin kapanması listenin yenilenmesi için
              guncellePanel.close();
              btnListele.onclick();
        }
  
})
}



//interaction güncelleme fonksiyonu
function interactionguncelleButon(){
    var _id = document.getElementById("IdTextGuncelleInteraction").value;
    var _nameGuncel = document.getElementById("NameTextGuncelInteraction").value;
    var _xGuncel = document.getElementById("xKonumGuncelInteraction").value;
    var _yGuncel = document.getElementById("yKonumGuncelInteraction").value;


    //güncelleme confirmation içinde fetch çalışır.
    Swal.fire({ 
        title: 'Güncellemek istediğinize emin misiniz?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, güncelle!'
      }).then((result) => {
        if (result.isConfirmed) {

    //PUT FETCH

    fetch('https://localhost:7133/api/Location?id=' + _id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id,
                x: (_xGuncel),
                y: (_yGuncel),
                name: _nameGuncel
            })
        })
        .then(res => {
            if (res.ok) {
                console.log("HTTP Çalışıyor")
    
            } else {
                console.log("HTTP çalışmyıor")
                
            }
            return res
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            interactionguncellePanel.close();
            Swal.fire(
                'Başarıyla Güncellendi!',
                    'Kayıt güncellendi',
                    'success'
          );
             window.location.reload();

         
        })
        .catch(error => 
            {console.log(error);
               
        })

        }
  
})

}


 //listeleme paneli
var listPanel = null;
var btnListele = document.getElementById("buttonListele");
btnListele.onclick = function () {

    if (listPanel) {
        listPanel.close();

    }

    listPanel = jsPanel.create({
        theme: 'dark',
        headerLogo: '<i class="fad fa-home-heart ml-2"></i>',
        headerTitle: 'Kayıtlı Lokasyonlar',
        headerToolbar: '<span class="text-sm">Eklenmiş olan lokasyonlar aşağıda listelenmektedir.</span>',
        panelSize: {
            width: () => {
                return Math.min(800, window.innerWidth * 0.9);
            },
            height: () => {
                return Math.min(700, window.innerHeight * 0.8);
            }
        },
        animateIn: 'jsPanelFadeIn',
        content: ` <table id='datatable'/>`,
        onwindowresize: true,

    });


    //GET FETCH
    fetch('https://localhost:7133/api/Location')
        .then(res => {
            if (res.ok) {
                console.log("HTTP Çalışıyor")
            } else {
                console.log("getirilemedi")
            }
            return res
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            var table = $('#datatable').DataTable({
                data: data.value,
                columns: [{
                        data: 'id',
                        title: "Id"
                    },
                    {
                        data: 'name',
                        title: "Ad"
                    },
                    {
                        data: 'x',
                        title: "X Koordinatı"
                    },
                    {
                        data: 'y',
                        title: "Y Koordinatı"
                    }
                ],
                columnDefs: [{
                    targets: 4,
                    "data": "id",
                    render: function (data, type, row, meta) {


                        return '<button class="btnEdit" id="' + data.id + '" onclick="duzenle()"' + meta.row + '" /><i class="fa fa-bars"></i></button>';

                    }

                }]
            });
            

            //data table'daki rowların güncelleme ekranına gelmesi.
            $('#datatable tbody').on("click", '.btnEdit', function () {

                var row = $(this).closest('tr');
                var guncellenmisId = table.row(row).data().id;
                $("#IdTextGuncelle").val(guncellenmisId);
                var guncellenmisName = table.row(row).data().name;
                $("#NameTextGuncel").val(guncellenmisName);
                var guncellenmisX = table.row(row).data().x;
                $("#xKonumGuncel").val(guncellenmisX);
                var guncellenmisY = table.row(row).data().y;
                $("#yKonumGuncel").val(guncellenmisY);


            });
        })

        .catch(error => {
            console.log(error);
            Swal.fire('Hay Aksi!',
                'Bir şeyler ters gitti',
                'error')
            listPanel.close();
        });

};


//düzenle butonuna tıklayınca panel açılması
let guncellePanel = null;

function duzenle() {
        
    if (guncellePanel) {
        guncellePanel.close();

    }
    guncellePanel = jsPanel.create({
        theme: 'dark',
       
        headerLogo: '<i class="fad fa-home-heart ml-2"></i>',
        headerTitle: 'Lokasyon Bilgileri',
        headerToolbar: '<span class="text-sm">Düzenlemek için bilgileri giriniz</span>',
        panelSize: {
            width: () => {
                return Math.min(600, window.innerWidth * 0.9);
            },
            height: () => {
                return Math.min(800, window.innerHeight * 0.8);
            }
        },
        animateIn: 'jsPanelFadeIn',

        content: ` 
        <div id="img2"><br><img src="/location2.png"></div>
         <label  id="yazi" >Güncellenecek id:</label><br><br>
     <input type="text"  style="color:darkred"  id="IdTextGuncelle" readonly />
     <br><br>
     <label  id="konumLabel" value="Konum Adı:">Konum Adı</label>
     </br><br>
     <input type="text" id="NameTextGuncel" />
     </br><br>
     <label  id="xLabel" value="Konum Adı:">X Koordinatı</label>
     </br><br>
     <input type="text" id="xKonumGuncel" " />
     </br><br>
     <label  id="yLabel" value="Konum Adı:">Y Koordinatı</label>
     </br><br>
     <input type="text" id="yKonumGuncel"  />

     </br><br/>
    
    <button id="btnGuncelle" onclick="guncelleButon()">Güncelle</button><br>
    <button id="btnSil" onclick="silButon()">Sil</button>
    
     
     </br><br/>`,
    })
    
    
}

var interactionguncellePanel;

function interactionduzenle() {
        
    
    interactionguncellePanel = jsPanel.create({
        theme: 'dark',
        position: {
            my: 'left-center',
            at: 'left-center',
            offsetX: 15,
            offsetY: 50
        },
        headerLogo: '<i class="fad fa-home-heart ml-2"></i>',
        headerTitle: 'Lokasyon Bilgileri',
        headerToolbar: '<span class="text-sm">Düzenlemek için bilgileri giriniz</span>',
        panelSize: {
            width: () => {
                return Math.min(600, window.innerWidth * 0.8);
            },
            height: () => {
                return Math.min(800, window.innerHeight * 0.8);
            }
        },
        animateIn: 'jsPanelFadeIn',

        content: `
        <div id="img2"><br><img src="/location2.png">
        </div><div class="interaction"> <label  id="yazi">Güncellenecek id:</label><br><br>
     <input type="text" id="IdTextGuncelleInteraction" readonly />
     <br><br>
     <label  id="konumLabel" value="Konum Adı:">Konum Adı</label>
     </br><br>
     <input type="text" id="NameTextGuncelInteraction" />
     </br><br>
     <label  id="xLabel" value="Konum Adı:">X Koordinatı</label>
     </br><br>
     <input type="text" id="xKonumGuncelInteraction" " />
     </br><br>
     <label  id="yLabel" value="Konum Adı:">Y Koordinatı</label>
     </br><br>
     <input type="text" id="yKonumGuncelInteraction"  />

     </br><br/>
    
    <button id="interactionbtnGuncelle" onclick="interactionguncelleButon()">Güncelle</button><br>
    <button id="interactionbtnSil" onclick="interactionsilButon()">Sil</button>
    
     
     </br><br/>
     </div>`,
    })
    
    
}


//ekleme jspaneli
var panelYap =null;
const panelOlustur = (coords) =>{

if(panelYap){
    panelYap.close();
    
}


    panelYap= jsPanel.create({
        theme: 'dark',        
        headerLogo: '<i class="fad fa-home-heart ml-2"></i>',
        headerTitle: 'Lokasyon Ekleme Paneli',
        headerToolbar: '<span class="text-sm">İlgili lokasyonun adını giriniz</span>',
      
        panelSize: {
            width: () => {
                return Math.min(600, window.innerWidth * 0.6);
            },
            height: () => {
                return Math.min(700, window.innerHeight * 0.7);
            }
        },
        animateIn: 'jsPanelFadeIn',
        
        content: `
        <div id="img"><br><br><img src="/locations.png"></div>
        <label id="konumLabel" value="Konum Adı:">Konum Adı</label>
        </br>
        <input type="text" id="NameText"/>
        </br></br>
        <label  id="xLabel" value="Konum Adı:">X Koordinatı</label>
        </br>
        <input type="text" id="xKonum" value=${coords[0]} readonly/>
        </br></br>
        <label  id="yLabel" value="Konum Adı:">Y Koordinatı</label>
        </br>
        <input type="text" id="yKonum" value=${coords[1]} readonly/>

        </br><br/>
       <button id ="btnEkle"  onclick="ekleButon()">Ekle</button>
       
       
        `,
        onwindowresize: true,
        
    });}

//HARİTA GETİRME KODU
  
function harita() {

    map = new ol.Map({
        
        //View, Layers ve Target bu 3ü  zorunlu elemanlardır.
        view: new ol.View({ // görüntümüzü ayarlayacağımız bölümdür.
            center: [3646164.0984667353, 4847765.351090939], //
            zoom: 10.769803598351844,
            maxZoom: 100,
            minZoom: 2,
        }),
        
        layers: [ //katman ve altyapı seçeceğimiz bölümdür
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer,
            
        ],
        
        target: 'js-map' //html'de nereye gideceğimizi belirler
        
        
    })


    const draw = new ol.interaction.Draw({
        source: vectorSource,
        type: "Point"

    })



    //INTERACTOIN KODLARI
    map.addInteraction(draw);

    draw.setActive(false);

    draw.on("drawend", (event) => {

        coordinates = event.feature.getGeometry().getCoordinates();
        panelOlustur(coordinates);
        
    })
    

    var btn = document.getElementById("buttonEkle"); //nokta ekle diyince interaction çalışacak

    btn.onclick = function () {
        
        draw.setActive(true);
        toastr.success('Nokta seçmeyi kaldırmak için Lokasyon Ekleye çift tıklayın');
 
    }

    
    btn.addEventListener('dblclick',(event) =>{
        draw.setActive(false);

    })


    //SAYFA YÜKLENDİĞİNDE INTERACTIONLARI GETİRME FONKSİYONU
    getInteractions();
   
    function getInteractions(){
   
    fetch("https://localhost:7133/api/Location", { //verinin gonderilecegi url
    method: 'GET',
    headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    },
})
  .then(response=>response.json())
  .then(data =>{    
    array = data.value;
      for (let index = 0; index < array.length; index++) {
        var feature = new ol.Feature({
          geometry: new ol.geom.Point([array[index].x , array[index].y]),
          name: array[index].name,
          condition: ol.events.condition.click,
          population: 4000,
          rainfall: 500,
          
          
        });
       
        vectorSource.addFeature(feature);

        //feature'a stil verme
        feature.setStyle(
            new ol.style.Style({
              image: new ol.style.Circle({
                //   fill: new ol.style.Fill({ color: [255,0,0,1] }),
                //   stroke: new ol.style.Stroke({ color: [0,0,0,1] }),
                //   radius: 9,
                
            }),image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
              src: 'loc.png',
              scale :0.04
          })
        }));
       
        //burada feature nesnesini daha sonra elde edebilmek için özelliklerini(id) tanımlıyoruz. Diğer tanımlamaları getAttributes'den tanımlarız.
        feature.setId(array[index].id);
      };
  });
 
   
}

     //INTERACTİON SEÇME-GÜNCELLEME

   
     map.on('singleclick', function (event) {
        
        
        map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            let _layer = layer;
            let _feature = feature;

            //panel açıksa kapatalım.
            if(interactionguncellePanel){
                interactionguncellePanel.close();
            }
            if(panelYap){
                if(interactionguncellePanel){
                    interactionguncellePanel.close()
                }
            }
            else{
            //paneli çağıralım
            
            
            //noktaya tıklayınca zoom yapması
            map.getView().setCenter(ol.extent.getCenter(feature.getGeometry().getExtent()));
            map.getView().setZoom(17);

            //panel açılmadan önce biraz bekletelim
            //paneli açmak için 
            //interactionduzenle(); çağrılacaktı

            interactionduzenle();
           
            //panele değerleri yazdıralım.
            var guncellenmisId = _feature.getId();
            $("#IdTextGuncelleInteraction").val(guncellenmisId);
    
            var guncellenmisName = _feature.getProperties().name;
            $("#NameTextGuncelInteraction").val(guncellenmisName);
    
            var guncellenmisX = _feature.getGeometry().getCoordinates()[0];
            $("#xKonumGuncelInteraction").val(guncellenmisX);
            
            var guncellenmisY =  _feature.getGeometry().getCoordinates()[1];
            $("#yKonumGuncelInteraction").val(guncellenmisY);
        }
        });
    });


}