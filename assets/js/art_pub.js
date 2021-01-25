$(function () {

    initEditor()
    initCates()
    var $image = $('#img')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 4 / 3,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('.btnChooseFile').on('click', function (e) {
        e.preventDefault();
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        let file = e.target.files[0]
        let newImage = URL.createObjectURL(file)
        $image.cropper('destroy').attr('src', newImage).cropper(options)
    })

    let state = null;
    $('.btnPub').on('click', function (e) {
        state = '已发布'
    })

    $('.btnDraft').on('click', function (e) {
        state = '草稿'
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData($(this)[0])
        fd.append('state', state)
        $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toBlob(function (blob) {
            fd.append('cover_img', blob)
            $.ajax({
                method: 'POST',
                url: '/my/article/add',
                data: fd,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                    }
                    layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                        location.href = 'art_list.html'
                    })
                }
            })
        })

    })

    function initCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return; ayui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-cates', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }
})