
function setSelect2(id) {
    $(".select-2-" + id).select2({
        theme: "bootstrap-5",
        minimumInputLength: 3,
        formatInputTooShort: function () {
            return "Enter 3 Character";
        },
    });
    $(".select-2").select2({
        theme: "bootstrap-5",
        minimumInputLength: 3,
        formatInputTooShort: function () {
            return "Enter 3 Character";
        },
    });
}