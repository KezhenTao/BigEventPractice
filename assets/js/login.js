$(function () {
    $('#goReg').on('click', function (e) {
        $('.login').hide().next().show()
    })

    $('#goLogin').on('click', function (e) {
        $('.register').hide().prev().show()
    })

    layui.form.verify({
        username: function (value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        pwd: [/^[a-zA-Z]\w{5,17}$/, '以字母开头，长度在6~18之间，只能包含字母、数字和下划线'],
        repwd: function (value) {
            if ($('#pwd').val() !== value) {
                return '两次输入的密码不一致'
            }
        }
    })

    $('#registerForm').on('submit', function (e) {
        e.preventDefault()
        let username = $('#username').val();
        let password = $('#pwd').val()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username,
                password
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    $('#registerForm')[0].reset()
                    $('#goLogin').click()
                })
            }
        })
    })

    $('#loginForm').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    localStorage.setItem('token', res.token)
                    location.href = 'index.html'
                })
            }
        })
    })


})