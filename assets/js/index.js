$(function () {
    getUserInfo()

    $('#btnLogout').on('click', function (e) {
        layer.confirm('退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = 'login.html'
            layer.close(index);
        });

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
            let name = res.data.nickname || res.data.username
            $('#welcome').text(`欢迎 ${name}`)
            renderAvatar(res.data, name)
        }
    })
}


function renderAvatar(data, name) {
    if (data.user_pic) {
        $('.layui-nav-img').attr('src', data.user_pic).show().next().hide()
    } else {
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show().prev().hide()
    }
}