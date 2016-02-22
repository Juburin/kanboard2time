if (!($ = window.jQuery)) {
    script = document.createElement( 'script' );
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    script.onload=releasetheKraken;
    document.body.appendChild(script);
}
else {
    releasetheKraken();
}
function releasetheKraken() {
    /* create the element */
    var h2 = $('#task-summary h2').first().text(),
    tasknumber = $(".sidebar h2").text().replace("Task ",""),
    options = "";
    $('.subtasks-table tr td:first-child a').each(function(){
        options += "<option>" + $(this).text() + "</option>";
    });
    var $container = $('<div id="kanboard2time"><p id="kanboard2time-text" style="margin: 1em 0;">' + tasknumber + " " + h2 + '</p></div>'),
        $close = $('<a id="kanboard2time-close" href="#">X</a>'),
        $select = $('<select name="task" id="task_selector"><option></option>'+options+'</select>');
    $container.append($close);
    $container.append($select);

    /* append it to the body */
    $('body').append($container);

    /* style it */
    $container.css({
        zIndex: '99',
        color: 'white',
        fontFamily: 'Helvetica, Arial',
        fontSize: '12px',
        position: 'fixed',
        top: '20px',
        right: '40%',
        width: '180px',
        minHeight: '70px',
        backgroundColor: '#06aa70',
        padding: '10px',
        MozBoxShadow: '2px 2px 5px #000000',
        WebkitBoxShadow: '2px 2px 5px black',
        boxShadow: '2px 2px 5px black'
    });

    $close.css({
        color: 'white',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
    });
    $select.css({
        width: '160px'
    });
}

function selectText(element) {
    var doc = document;
    var text = doc.getElementById(element);

    if (doc.body.createTextRange) { /* ms */
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { /* moz, opera, webkit */
        var selection = window.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

$('#kanboard2time-close').on('click', function(event){
    event.preventDefault();
    $('#kanboard2time').remove();
});
$('#kanboard2time-text').on('dblclick', function(event){
    event.preventDefault();
    selectText('kanboard2time-text');
});
$('#task_selector').on('change', function(event){
    event.preventDefault();
    $('#kanboard2time-text').html($('#kanboard2time-text').html() + '<span><br/> - ' + $(this).val() + '</span>');
});
$('#kanboard2time').on('contextmenu', 'span', function(event) {
    $(this).remove();
    return false;
});
