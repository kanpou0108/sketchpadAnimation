$(document).ready(function() {

    var sketchpad = new Sketchpad({
        element: '#sketchpad',
        width: 450,
        height: 450,
        color: '#000000',
        penSize: 8
    });
    
    // 初期表示を上記インスタンス作成時に設定した値にするために必要
    $('#color-picker').val('#000000');
    $('#color-picker').change(color);

    $('#size-picker').val(8);
    $('#size-picker').change(size);
    
    $('#speed-picker').val(10);

    $("#animate").on("click", function() {
        // String→Numberの型変換しないとエラーは出ないが、上手く描画出来ない！
        var speed = $('#speed-picker').val();
        sketchpad.animate(Number(speed));
    });

    $("#animate-loop").on("click", function() {
        var speed = $('#speed-picker').val();
        sketchpad.animate(Number(speed), true);
    });

    $("#all-clear").on("click", function() {
        sketchpad.clear();
        sketchpad.strokes = [];
    });

    $("#cancel").on("click", function() {
        sketchpad.cancelAnimation();
    });

    $("#undo").on("click", function() {
        sketchpad.undo();
    });

    $("#redo").on("click", function() {
        sketchpad.redo();
    });

    $("#recover").on("click", function() {
        recover()
    });

    // input type="range"のリアルタイム変更！
    $("#size-picker").on("input", function() {
        $('#size-picker-value').text($(this).val());
    });

    $("#speed-picker").on("input", function() {
        $('#speed-picker-value').text($(this).val());
    });

    function color(event) {
        sketchpad.color = $(event.target).val();
    }

    function size(event) {
        sketchpad.penSize = $(event.target).val();
    }

    function recover(event) {
        var settings = sketchpad.toObject();
        settings.element = '#other-sketchpad';
        var otherSketchpad = new Sketchpad(settings);
        // $('#recover-button').hide();
    }

});

Sketchpad.prototype._mouseMove = function(event) {
  var currentPosition = this._cursorPosition(event);

  if ($('#eraser').is(':checked')) {
      this._erase(this._lastPosition, currentPosition, this.color, this.penSize);  
    } else {
        this._draw(this._lastPosition, currentPosition, this.color, this.penSize);  
    }
  
  this._currentStroke.lines.push({
    start: $.extend(true, {}, this._lastPosition),
    end: $.extend(true, {}, currentPosition),
  });

  this._lastPosition = currentPosition;
};
