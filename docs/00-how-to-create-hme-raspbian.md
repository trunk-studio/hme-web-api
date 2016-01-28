# disable getty service

釋放 `/dev/ttyAMA0`

```
sudo systemctl stop serial-getty@ttyAMA0.service
```

```
sudo systemctl disable serial-getty@ttyAMA0.service
```

