## Install node

```
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
```

## Install wiringPi

```
cd ~
git clone git://git.drogon.net/wiringPi
cd wiringPi
./build
```

## `/etc/fstab` for USB stick

USB stick must be FAT32 and add this at the end of the file.
Should work with any USB stick, if not use `sudo blkid` to get the UUID and use it instead of `/dev/sda1` (e.g. `UUID=E3AB-886E`).

```
/dev/sda1 /media/mbb       vfat    defaults          0       2
```

## Clone the project

```
cd ~
git clone https://github.com/etrange-miroir/territoire.git
```

## Run script

Add the following to the bottom of `/etc/rc.local`

```
sudo sh -c "TERM=linux setterm -foreground black -clear >/dev/tty0" && amixer cset numid=3 1 && cd /home/pi/territoire && sudo /opt/node/bin/node client.js
```

## Configuration

On the USB stick, at the root, there must be a file called `conf.yml`, the content of the file should match the following:
```
dossier: zinor250416
extension: mp3
```

BE AWARE OF THE SPACE RIGHT AFTER THE `:` CHARACTER, IF THERE IS NO SPACE HERE, IT WON'T work

- dossier: it is the name of the folder where the media are on the USB stick
- extension: it is the type of file (can be mp3 or mp4)

## Naming audio/video

Should be `.mp3` or `.mp4`.

Names must be from `0.mp3` to `9.mp3` (or `.mp4`, but not mixed, only mp3 or only mp4)
