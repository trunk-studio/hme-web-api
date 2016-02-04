如何製作樹莓派系統？
=====================

* 取得原廠 Raspbian "Lite" Image
* 使用讀卡機將 .img 燒至 SD 記憶卡

* 調整磁碟容量（調整至記憶卡容量上限）
* 語系設定 en_US
* 時區設定
* 配置擴充板 RTC / hwclock
* 鍵盤 Layout 設定
* 安裝 NVM
* 取得最新 production 版本程式
* NPM INSTALL
* 安裝 PM2、設定 pm2 startup
* 設置 /boot/hme.txt


Additionals

* Disable BASH history


### disable getty service

釋放 `/dev/ttyAMA0`

```
sudo systemctl stop serial-getty@ttyAMA0.service
```

```
sudo systemctl disable serial-getty@ttyAMA0.service
```


# master reportEmail crontab
*/1 * * * * wget -O - localhost:3000/rest/admin/sendmail/info >log.txt 2>&1
