function getObat(id, rowId) {
    $.get({
        url: OBAT_URL + "getData/" + id,
        cache: true,
        success: function (data) {
            let htm = '';
            if (id == 'undefined' || id == '') {
                htm += `<option val="">--Pilih Obat--</option>`;
                for (i in data) {
                    htm += `<option value="` + data[i].obatalkes_id + `">` + data[i].obatalkes_kode + ` | ` + data[i].obatalkes_nama + `</option>`;
                }
                $(".select-obtalkes" + rowId).html(htm);
            } else {
                if (obatExists(arrStock, id) == true) {
                    let result = arrStock.find(obj => {
                        return obj.obat === id
                    })
                    $("#stok-obat" + rowId).val(result.stok);
                } else {
                    $("#stok-obat" + rowId).val(data.stok);
                }
                cekStok($("#stok-obat" + rowId).val(), rowId);
            }
        }
    });
}

function getSigna() {
    $.get({
        url: SIGNA_URL + "getData",
        cache: true,
        success: function (data) {
            let htm = '';
            htm += `<option val="">--Pilih Signa--</option>`;
            for (i in data) {
                htm += `<option value="` + data[i].signa_id + `">` + data[i].signa_kode + ` | ` + data[i].signa_nama + `</option>`;
            }
            $(".select-signa").html(htm);
        }
    });
}

function dumpDraft(dataDraft) {
    let htm = '';
    dataDraft = JSON.parse(dataDraft);
    no = 0;
    for (i in dataDraft.nonRacikan) {
        no++;
        htm += `
        <tr>
        <td class="text-center">`+ no + `</td>
        <td class="text-center">`+ dataDraft.nonRacikan[i].jenis + `</td>
        <td>`+ dataDraft.nonRacikan[i].obat_text + `</td>
        <td class="text-center">`+ dataDraft.nonRacikan[i].qty + `</td>
        <td>`+ dataDraft.nonRacikan[i].signa_text + `</td>
        </tr>
        `;
    }
    for (j in dataDraft.racikan) {
        no++;
        htm += `
        <tr>
        <td class="text-center align-middle" rowspan="`+ (dataDraft.racikan[j].obat_id.length + 1) + `">` + no + `</td>
        <td class="text-center align-middle"  rowspan="`+ (dataDraft.racikan[j].obat_id.length + 1) + `">` + dataDraft.racikan[j].jenis + `</td>
        <td>`+ dataDraft.racikan[j].namaRacikan + `</td>
        <td class="text-center ">1</td>
        <td class="align-middle" rowspan="`+ (dataDraft.racikan[j].obat_id.length + 1) + `">` + dataDraft.racikan[j].signa_text + `</td>
        </tr>
        `;

        for (k = 0; k < dataDraft.racikan[j].obat_id.length; k++) {
            console.log(dataDraft.racikan[j].qty[k]);
            htm += `
            <tr>
            <td>   - `+ dataDraft.racikan[j].obat_text[k] + `</td>
            <td class="text-center">`+ dataDraft.racikan[j].qty[k] + `</td>
            </tr>
            `;
        }
    }
    $('#table-draft').find('tbody').html(htm);
    clearForm();
}

function clearForm() {
    $(".select-signa").val('');

    $("select[name='obat[]']").map(function () { return $(this).val(''); });
    $("input[name='qtyobat[]']").map(function () { return $(this).val(0); });
    $("input[name='stokobat[]']").map(function () { return $(this).val(0); });
    $("#appendRacikan").html(`
        <tr>
        <td colspan="2">
        <div class="form-group">
        <label>NAMA RACIKAN</label>
        <input type="text" class="form-control" placeholder="Masukan nama racikan" id="nama-racikan">
        <small id="nama-error" class="text-danger"></small>
        </div>
        </td>
        <td colspan="2">
        <div class="form-group">
        <label>SIGNA</label>
        <select class="form-control select-2 select-signa"></select>
        <small id="signa-error" class="text-danger"></small>
        </div>
        </td>
        </tr>
        <tr>
        <td width="50%">
        <div class="form-group">
        <label>OBAT</label>
        <select class="form-control select-2-1 changeSelect select-obtalkes1" name="obat[]" data-rowidobat="1"></select>
        <small id="obat-error1" class="text-danger"></small>
        </div>
        </td>
        <td width="20%">
        <div class="form-group">
        <label>Stok</label>
        <input type="number" class="form-control" value="0" id="stok-obat1" readonly name="stokobat[]" data-rowidstok="1">
        <small id="stok-error1" class="text-danger"></small>
        </div>
        </td>
        <td width="20%">
        <div class="form-group">
        <label>QTY</label>
        <input type="number" class="form-control" value="0" id="qty-obat1" disabled name="qtyobat[]" data-rowidqty="1">
        <small id="qty-error1" class="text-danger"></small>
        </div>
        </td>
        <td width="10%">
        <div class="form-group">
        <br>
        <button class="btn btn-primary addRacikan" type="button" title="Add More"><i class="fas fa-plus"></i></button>
        </div>
        </td>
        </tr>`);
    tempRacikan = [];
    getObat('undefined', '1');
    getSigna();
    setSelect2(1);
}

function obatExists(arr, obat) {
    return arr.some(function (el) {
        return el.obat === obat;
    });
}

function cekInput() {
    let resCekObat = $("select[name='obat[]'] ").map(function () {
        let rowId = $(this).data("rowidobat");
        return cekObat($(this).val(), rowId);
    }).get(),
    resCekQty = $("input[name='qtyobat[]'] ").map(function () {
        let rowId = $(this).data("rowidqty");
        return cekQty($(this).val(), rowId);
    }).get(),
    resCekStok = $("input[name='stokobat[]'] ").map(function () {
        let rowId = $(this).data("rowidstok");
        return cekStok($(this).val(), rowId);
    }).get(),
    signa_id = $(".select-signa").val(),
    resCekSigna = cekSigna(signa_id),
    nama = $("#nama-racikan").val(),
    resCekNama = cekNama(nama);

    if ((resCekObat.includes(false) == true ? false : true) && resCekSigna == true && (resCekQty.includes(false) == true ? false : true) && (resCekStok.includes(false) == true ? false : true)) return true;
    return false;
}

function cekSigna(signa) {
    if (signa != '' && signa != null && typeof (signa) != 'undefined' && signa != '--Pilih Signa--') {
        $("#signa-error").text("");
        return true;
    }
    $("#signa-error").text("Silahkan pilih signa terlebih dahulu");
    return false;
}
function cekNama(nama) {
    if (nama != '' && nama != null && typeof (nama) != 'undefined') {
        $("#nama-error").text("");
        return true;
    }
    $("#nama-error").text("Silahkan masukan nama racikan terlebih dahulu");
    return false;
}
function cekObat(obat, rowId) {
    if (obat != '' && obat != null && typeof (obat) != 'undefined' && obat != '--Pilih Obat--') {
        $("#obat-error" + rowId).text("");
        return true;
    }
    $("#obat-error" + rowId).text("Silahkan pilih obat terlebih dahulu");
    return false;
}
function cekQty(qty, rowId) {
    let stok = $("#stok-obat" + rowId).val();
    if (qty == '' || qty == 0) {
        $("#qty-error" + rowId).text('*QTY tidak boleh kosong');
    } else {
        if ((stok - qty) < 0) {
            $("#qty-error" + rowId).text('*QTY melebihi stok');
        } else {
            $("#qty-error" + rowId).text('');
            return true;
        }
    }
    return false;
}
function cekStok(stok, rowId) {
    console.log([stok, rowId]);
    if (stok == '' || stok == 0) {
        $("#stok-error" + rowId).text('*Stok tidak boleh kosong');
    } else {
        $("#stok-error" + rowId).text('');
        return true;
    }
    return false;
}

function saveResep(nonracik, racik) {


    $.ajax({
        type: 'POST',
        url: RESEP_URL + "create",
        data: { nonracik: nonracik, racik: racik },
        success: function (data) {
            if (data.status == true) {
                toastr.success('Berhasil menyimpan data. Mohon tunggu, anda akan diarahkan kehalaman lain', 'BERHASIL!');
                location.reload();
            } else {
                toastr.error('Gagal menyimpan data. Mohon tunggu,  halaman akan di refresh', 'GAGAL!');
            }
        }
    });
}