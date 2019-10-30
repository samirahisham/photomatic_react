import $ from "jquery";

const fn = () => {

 $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled")
 })
};

 export default fn;