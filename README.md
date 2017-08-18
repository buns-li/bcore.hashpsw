# bcore.hashpsw

bcore微服务---账户密码加密

## API

**encrypt(password)**:
加密密码

* `password` : [`String`] 明文密码

**compare(password,cryptedPassword)**:
比较明文密码和加密的密码

* `password`: [`String`] 明文密码
* `cryptedPassword`: [`String`] 加密后的密码

加密算法如下: (借鉴`Dropbox`的加密方式)

1. `sha512`算法来讲明文密码的统一成64字节hash值
  因为两个原因：
    一个是Bcrypt算对输入敏感，如果用户输入的密码较长，可能导致Bcrypt计算过慢从而影响响应时间；
    另一个是有些Bcrypt算法的实现会将长输入直接截断为72字节，从信息论的角度讲，这导致用户信息的熵变小；

1. `bcrypt`: 参考网上关于bcrypt的描述

1. `aes`加密: 利用非存储在数据库的全局秘钥来保证在`down库`之后,还可以留下一层保护