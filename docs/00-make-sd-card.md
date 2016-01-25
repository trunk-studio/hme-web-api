# SD系統開機卡製作

## 將記憶卡複製為映像檔

```
sudo dd bs=1m if=/dev/rdisk2 of=20160125-raspbian-hme.img
```

## 將映像檔輸出到記憶卡

```
diskutil unmountDisk /dev/disk2
```

```
bs=1m if=20160125-raspbian-hme.img of=/dev/rdisk2
```

## Trouble shooting

dd: /dev/rdisk2: Permission denied

```
sudo diskutil partitionDisk /dev/disk2 1 MBR "Free Space" "%noformat%" 100%
```

