$(function () {


    let pageData = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initCates()
    initList()



    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        pageData.cate_id = $('[name=cate_id]').val()
        pageData.state = $('[name=state]').val()
        initList()
    })

    $('tbody').on('click', '.btnDel', function (e) {
        let id = $(this).attr('data-id')
        let length = $('.btnDel').length
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                    }
                    layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                        if (pageData.pagenum !== 1) {
                            length == 1 ? pageData.pagenum = pageData.pagenum - 1 : pageData.pagenum
                        }
                        initList()
                    })
                }
            })

            layer.close(index);
        });

    })

    $('tbody').on('click', '.btnEdit', function (e) {
        let id = $(this).attr('data-id')
        location.href = 'atr_edit.html?id=' + id
    })

    function initCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }

    function initList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: pageData,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-list', res)
                $('tbody').html(htmlStr)
                layui.form.render()
                paginator(res.total)
            }
        })
    }

    function paginator(total) {
        layui.laypage.render({
            elem: 'paginatorBox',
            count: total,
            limit: pageData.pagesize,
            curr: pageData.pagenum,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                pageData.pagenum = obj.curr;
                pageData.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    initList()
                }
            }
        });
    }
})