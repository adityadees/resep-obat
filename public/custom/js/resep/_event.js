$(document).ready(function () {
    setSelect2(1);
    $("input:radio[name='jenis_resep'][value='Non Racikan']").click();
});

let arrRacikan = [],
    arrNonRacikan = [],
    arrStock = [];

$("[name='jenis_resep']").change(function () {
    clearForm();
    let htm = '';
    getObat('undefined', '1');
    getSigna();
    if ($(this).val() == 'Non Racikan') {
        htm += `
             <div class="row">
                 <div class="col-md-8 mb-2">
                     <div class="form-group">
                         <label>OBAT</label>
                        <select class="form-control select-2-1 changeSelect select-obtalkes1" name="obat[]" data-rowidobat="1"></select>
                         <small id="obat-error1" class="text-danger"></small>
                     </div>
                 </div>
                 <div class="col-md-4 mb-2">
                     <div class="form-group">
                         <label>Stok</label>
                        <input type="number" class="form-control" value="0" id="stok-obat1" name="stokobat[]" readonly data-rowidstok="1">
                         <small id="stok-error1" class="text-danger"></small>
                     </div>
                 </div>
             </div>
             <div class="row mb-2">
                 <div class="col-md-8 mb-2">
                     <div class="form-group">
                         <label>SIGNA</label>
                        <select class="form-control select-2 select-signa"></select>
                         <small id="signa-error" class="text-danger"></small>
                     </div>
                 </div>
                 <div class="col-md-4 mb-2">
                     <div class="form-group">
                         <label>QTY</label>
                        <input type="number" class="form-control" value="0" id="qty-obat1" name="qtyobat[]" disabled  data-rowidqty="1">
                         <small id="qty-error1" class="text-danger"></small>
                     </div>
                 </div>
             </div>
         `;
    } else {
        htm += `
        <table class="table table-hovered form-table" id="appendRacikan" width="100%">
            <tr class="border-0">
                <td class="border-0" colspan="2">
                    <div class="form-group">
                        <label>NAMA RACIKAN</label>
                        <input type="text" class="form-control" placeholder="Masukan nama racikan" id="nama-racikan">
                        <small id="nama-error" class="text-danger"></small>
                        </div>
                </td>
                <td class="border-0" colspan="2">
                    <div class="form-group">
                        <label>SIGNA</label>
                        <select class="form-control select-2 select-signa"></select>
                        <small id="signa-error" class="text-danger"></small>
                    </div>
                </td>
            </tr>
            <tr class="border-0">
                <td class="border-0" width="40%">
                    <div class="form-group">
                        <label>OBAT</label>
                        <select class="form-control select-2-1 changeSelect select-obtalkes1" name="obat[]" data-rowidobat="1"></select>
                        <small id="obat-error1" class="text-danger"></small>
                    </div>
                </td>
                <td class="border-0" width="25%">
                    <div class="form-group">
                        <label>Stok</label>
                        <input type="number" class="form-control" value="0" id="stok-obat1" name="stokobat[]" readonly data-rowidstok="1">
                        <small id="stok-error1" class="text-danger"></small>
                    </div>
                </td>
                <td class="border-0" width="25%">
                    <div class="form-group">
                        <label>QTY</label>
                        <input type="number" class="form-control" value="0" id="qty-obat1" name="qtyobat[]" disabled  data-rowidqty="1">
                        <small id="qty-error1" class="text-danger"></small>
                    </div>
                </td>
                <td class="border-0" width="10%">
                    <div class="form-group">
                        <br>
                        <button class="btn btn-primary addRacikan" type="button" title="Add More"><i class="fas fa-plus"></i></button>
                    </div>
                </td>
            </tr>
        </table> 
        `;
    }
    $("#display-form").html(htm);
    setSelect2(1);
});


$(document).ready(function () {
    no = 1;
    $(document).on('click', '.addRacikan', function (e) {
        no++;
        $("#appendRacikan").append(`
        <tr class="border-0">
                <td class="border-0 width="40%">
                    <div class="form-group">
                        <label>OBAT</label>
                        <select class="form-control select-2-`+ no + ` changeSelect select-obtalkes` + no + `" name="obat[]" data-rowidobat="` + no + `"></select>
                        <small id="obat-error`+ no + `" class="text-danger"></small>
                    </div>
                </td>
                <td class="border-0 width="25%">
                    <div class="form-group">
                        <label>Stok</label>
                        <input type="number" class="form-control" value="0" id="stok-obat`+ no + `" readonly name="stokobat[]" data-rowidstok="` + no + `">
                        <small id="stok-error`+ no + `" class="text-danger"></small>
                    </div>
                </td>
                <td class="border-0 width="25%">
                    <div class="form-group">
                        <label>QTY</label>
                        <input type="number" class="form-control" value="0" id="qty-obat`+ no + `" disabled name="qtyobat[]" data-rowidqty="` + no + `">
                        <small id="qty-error`+ no + `" class="text-danger"></small>
                    </div>
                </td>
                <td class="border-0 width="10%">
                    <div class="form-group">
                        <br>
                    <button class="btn btn-danger removeRacikan" type="button" title="Add More"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
        </tr>`);
        getObat('undefined', no);

        setSelect2(no);

    });
    $(document).on('click', '.removeRacikan', function (e) {
        $(this).parent().parent().parent().remove();
    });
});

let tempRacikan = [];
$(document).on('change', '.changeSelect', function (e) {
    let rowId = $(this).data("rowidobat");
    if (tempRacikan.includes($(this).val()) == true) {
        $("#obat-error" + rowId).text("Anda sudah menambahkan obat ini");
        toastr.error('Anda tidak dapat lagi menambahkan obat ini', 'Obat sudah ada di resep');
        $(this).parent().parent().parent().remove();
    } else {
        tempRacikan.push($(this).val());
        if (cekObat($(this).val(), rowId) == true) {
            getObat($(this).val(), rowId);
            $("#qty-obat" + rowId).prop("disabled", false);
        }
        $("#obat-error" + rowId).text("");
    }
});

$(document).on('change', '.select-signa', function (e) {
    cekSigna($(this).val());
});

$(document).on('change keydown paste input', "#nama-racikan", function () {
    cekNama($(this).val());
});

$(document).on('change keydown paste input', "input[name='qtyobat[]']", function () {
    let rowId = $(this).data("rowidqty");
    cekQty($(this).val(), rowId);
});

$(document).on('click', '#save-draft', function (e) {
    let obat_id = $("select[name='obat[]']").map(function () { return $(this).val(); }).get().join('#@!#@'),
        qty = $("input[name='qtyobat[]']").map(function () { return $(this).val(); }).get().join('#@!#@'),
        stok = $("input[name='stokobat[]']").map(function () { return $(this).val(); }).get().join('#@!#@'),
        obat_text = $("select[name='obat[]'] option:selected").map(function () { return $(this).text().split(" | ")[1]; }).get().join('#@!#@'),
        signa_id = $(".select-signa").val(),
        signa_text = $(".select-signa option:selected").text(),
        jenis = $("[name='jenis_resep']:checked").val(),
        resCekInput = cekInput();

    if (resCekInput == true) {
        if (jenis == 'Non Racikan') {
            arrNonRacikan.push({
                obat_id: obat_id,
                signa_id: signa_id,
                obat_text: obat_text,
                signa_text: signa_text.split(" | ")[1],
                stok: stok,
                qty: qty,
                jenis: jenis,
            });

            if (obatExists(arrStock, obat_id) == true) {
                let arrReplace = [{ obat: obat_id, stok: stok - qty }];
                arrStock = arrStock.map(obj => arrReplace.find(o => o.obat === obj.obat) || obj);
            } else {
                arrStock.push({ obat: obat_id, stok: stok - qty });
            }
        } else {
            let namaRacikan = $("#nama-racikan").val(),
                arrObat = obat_id.split('#@!#@'),
                arrStok = stok.split('#@!#@'),
                arrQty = qty.split('#@!#@'),
                arrObatText = obat_text.split('#@!#@');
            for (i in arrObat) {
                if (obatExists(arrStock, arrObat[i]) == true) {
                    let arrReplace = [{ obat: arrObat[i], stok: arrStok[i] - arrQty[i] }];
                    arrStock = arrStock.map(obj => arrReplace.find(o => o.obat === obj.obat) || obj);
                } else {
                    arrStock.push({ obat: arrObat[i], stok: arrStok[i] - arrQty[i] });
                }
            }

            arrRacikan.push({
                obat_id: arrObat,
                signa_id: signa_id,
                obat_text: arrObatText,
                signa_text: signa_text.split(" | ")[1],
                stok: arrStok,
                qty: arrQty,
                namaRacikan: namaRacikan,
                jenis: jenis,
            });

        }


        dumpDraft(JSON.stringify({ nonRacikan: arrNonRacikan, racikan: arrRacikan }));
        $("#appendSubmit").html(`
        <div class="form-group text-center">
        <button class="btn btn-success" id="simpan-resep"><i class="fas fa-save"></i> Simpan Resep</button>
        </div>
        `);
    }
});

$(document).on('click', '#simpan-resep', function (e) {
    saveResep(JSON.stringify(arrNonRacikan), JSON.stringify(arrRacikan));
});
