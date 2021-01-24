$(function () {
    initCates()

    var addIndex;
    $('.btnAdd').on('click', function (e) {
        addIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#tpl-addForm').html(),
            area: ['500px', '250px']
        });
    })

    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }

                layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    layer.close(addIndex);
                    initCates()
                })
            }
        })
    })

    $('tbody').on('click', '.btnDel', function (e) {
        e.preventDefault();
        let id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                    }
                    layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                        initCates()
                    })
                }
            })

            layer.close(index);
        });

    })


    var editIndex
    $('tbody').on('click', '.btnEdit', function (e) {
        e.preventDefault()
        let id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                editIndex = layer.open({
                    type: 1,
                    title: '修改文章分类',
                    content: $('#tpl-editForm').html(),
                    area: ['500px', '250px'],
                    success: function () {
                        layui.form.val('editFPopup', res.data)
                    }
                });
            }
        })

    })

    $('body').on('submit', '#editForm', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    layer.close(editIndex);
                    initCates()
                })
            }
        })
    })

    function initCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-cates', res)
                $('tbody').html(htmlStr)
            }
        })
    }
})