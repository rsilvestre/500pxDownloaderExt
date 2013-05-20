// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-41060820-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var url = window.location + "";

if (url.search('(500px.com/photo)') !== -1) {

    $(document).ajaxStop(function() {
        addButton($);
    });

    var get_id = document.getElementById("thephoto").childNodes;

    var get_link = get_id[1].href;

    var a = document.createElement('a');
    var div = document.createElement('div');

    a.appendChild(div);

    var sp2 = document.getElementById('thephoto');
    var parentDiv = sp2.parentNode;
    parentDiv.insertBefore(a,sp2);
    //document.getElementById('subheader').appendChild(a);
    //document.getElementById('subheader').setAttribute('style', 'height: 100px');

    //a.setAttribute('class', 'button like');
    a.setAttribute('href', get_link);
    a.setAttribute('download', $('.photo_subheader').find('h2').html() || '500px.jpg');
    div.setAttribute('class', 'button red');
    div.setAttribute('style', 'margin: 10px auto');
    div.appendChild(document.createTextNode("Download"));

    get_id = null;
    get_link = null;
}

if (url.search('(500px.com/)') !== -1) {

    $(document).ajaxStop(function() {
        addButton($);
    });
    addButton($);

}

function addButton($) {
    var $aImageContainer = $('[class="photo medium"]');
    var $image = $aImageContainer.find("img");

    for (var i=0, maxV = $image.length;i<maxV;++i) {

        var parentDiv = $($image[i]).parent();

        if (($(parentDiv).parent().find('.button')).length == 0) {
            var get_link = ($($image[i]).attr('src')).replace('3.jpg','4.jpg');

            var a = document.createElement('a');
            var div = document.createElement('div');

            a.appendChild(div);
            //parentDiv.insertBefore(a,sp2);
            $(a).insertBefore(parentDiv);

            //a.setAttribute('class', 'button like');
            a.setAttribute('href', get_link);
            a.setAttribute('download', $($aImageContainer[i]).parent().find('div.title').find('a').html() || '500px.jpg' );
            div.setAttribute('class', 'button red');
            div.setAttribute('style', 'margin: 10px auto');
            div.setAttribute('style', 'padding: 14px');
            div.appendChild(document.createTextNode("Download"));

            get_link = null;
            a = null;
            div = null;
        }
    }
}

//var rsTest = url.search('(500px.com/)');
var pattern = new RegExp("500px.com/(?!(login|flow|activity|market|photo[^s]|blog|upgrade|settings)).*");

//if (rsTest !== -1) {
if (pattern.test(url) && window.location.pathname != "/") {

    var parentDiv = $('.container');

    var a = document.createElement('a');
    var div = document.createElement('div');

    a.appendChild(div);
    //parentDiv.insertBefore(a,sp2);
    //$(a).insertBefore(parentDiv);
    $(parentDiv).prepend(a);

    a.setAttribute('class', 'fileDownloadCustomRichExperience');
    //a.setAttribute('href', get_link);
    //a.setAttribute('download', '500px.jpg');
    div.setAttribute('class', 'button red');
    div.setAttribute('style', 'margin: 10px auto');
    div.setAttribute('style', 'padding: 14px');
    div.appendChild(document.createTextNode("Download All"));

    $(function () {
        $("a.fileDownloadCustomRichExperience").click(function () {
            var $aImageContainer = $('[class="photo medium"]');
            var $image = $aImageContainer.find("img");
            var filenameContainer = [];
            for (var i=0, maxV = $image.length;i<maxV;++i) {

                var get_link = ($($image[i]).attr('src')).replace('3.jpg','4.jpg');
                if (!window.ActiveXObject) {
                    var save = document.createElement('a');
                    save.href = get_link;
                    save.target = '_blank';
                    var filename = $($aImageContainer[i]).parent().find('div.title').find('a').html();
                    filenameContainer[filename] = typeof filenameContainer[filename] !== 'undefined' && filenameContainer[filename] !== null ? filenameContainer[filename]+1:0;
                    save.download = filename + ((filenameContainer[filename] >0) ?" "+ filenameContainer[filename]:"") || '500px.jpg';

                    var event = document.createEvent('Event');
                    event.initEvent('click', true, true);
                    save.dispatchEvent(event);
                    (window.URL || window.webkitURL).revokeObjectURL(save.href);
                }
                /*
                // for IE
                else if ( !! window.ActiveXObject && document.execCommand)     {
                    var _window = window.open(get_link, '_blank');
                    _window.document.close();
                    _window.document.execCommand('SaveAs', true, fileName || fileURL)
                    _window.close();
                }
                */
            }

            return false; //this is critical to stop the click event which will trigger a normal file download!
        });
    });
}