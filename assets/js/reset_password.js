$(function () {
    layui.form.verify({
        pwd: [/^[a-zA-Z]\w{5,17}$/, '以字母开头，长度在6~18之间，只能包含字母、数字和下划线'],
        repwd: function (value) {
            if ($('#newPwd').val() !== value) {
                return '两次输入的密码不一致'
            }
        }
    })

    $('#resetPwdForm').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }

                layui.layer.msg(res.message, { icon: 1, time: 1000 })
                $('#resetPwdForm')[0].reset()
            }
        })
    })
})