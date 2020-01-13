$(function () {
    // 1.进行表单校验
    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 对字段进行校验,验证的input标签必须加上name属性
        fields: {
            username: {
                // 校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    // c长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度是2-6位'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                // 校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    // c长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度是6-12位'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }),

        // 2.进行登录请求
        // 表单验证通过的请求
        $('#form').on('success.form.bv', function (e) {
            e.preventDefault()
            // 发送ajax
            $.ajax({
                type: 'post',
                url: '/employee/employeeLogin',
                dataType: 'json',
                data: $('#form').serialize(),
                success: function (info) {
                    console.log(info);
                    // 登录成功后的操作
                    if (info.success) {
                        location.href = "index.html"
                    } else if (info.eroor === 1000) {
                        // 用户名不存在
                        $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                    } else if (info.error === 1001) {
                        // 密码错误
                        $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
                    }
                }
            })
        })


    // 3.表单的重置功能
    $('.btn-reset').click(function () {
        $('#form').data('bootstrapValidator').resetForm()
    })
})
