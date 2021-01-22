$(function () {
    getUserInfo()

    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度不能大于6位'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.msessage, { icon: 2, time: 1000 })
                }
                layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    window.parent.getUserInfo()
                })
            }
        })
    })

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        getUserInfo()
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message, { icon: 2, time: 1000 })
            }
            layui.layer.msg(res.message, { icon: 1, time: 1000 })
            layui.form.val('formUserInfo', res.data)
        }
    })
}