---
path: "/blog/setting-up-react-native-with-expo-and -android-studio-on-ubuntu18.04"
date: "2020-01-10"
title: "Setting up React Native with Expo and Android studio on Ubuntu 18.04"
published: true
description: How to install react native, Expo, and Android Studio on Ubuntu 18.04
---

[React-Native](https://facebook.github.io/react-native/) is a framework developed by Facebook to create applications for Android, IOS and Web Platforms. It is written in Javascript and renders to the native platform. It is advisable for beginners getting started in mobile development to use the Expo CLI. [Expo](https://expo.io/) is a framework built around React Native and native platforms and helps in building, deploying and quickly iterating IOS, Android and Web Apps.

The following instructions will show how to setup React Native with Expo and the Android Studio which is Android official IDE (Integrated Development Environment) and we will be using the Android Studio to access the Android Emulator a virtual device on Ubuntu 18.04.

## Getting Started

This tutorial assumes you have Node.js installed on your machine if you don't, follow the installation instructions [here](https://nodejs.org/en/) to get started. We'll be using npm which is a package manager and comes with Node.js to install the packages needed.

Once the above step is done open up your terminal and run the code below:

```shell
npm install -g expo-cli
```

The above command installs the expo-cli globally which allows us to create and manage our react native apps with expo.

After that run:

```shell
expo init hello-mobile
cd hello-mobile
expo start
```

This creates a new react native project with expo and starts it up. If everything was successful, the results should be similar to the screenshot below:

![Expo Startup Screenshot ](https://res.cloudinary.com/dis3a42lz/image/upload/v1577365668/blog/setup-react-native/expo1.png "Expo Start-Up")

At this point, we have expo and react-native up and running.

## Setting up Android Studio

As mentioned above Android Studio is Android's official IDE and it comes with a lot of features beyond the scope of this article. The one feature we are interested in is AVD(Android Virtual Device) which is an interface that allows us to emulate Android Devices.

Before we install Android studio run the following command in your terminal to check if your Ubuntu Machine supports virtualization.

``` shell
egrep --color 'vmx|svm' /proc/cpuinfo | wc -l
```

If the result returns a value greater than zero it means the machine has virtualization support. Virtualization is required to run the emulator smoothly.

We can now go on to install some necessary utilities needed for Android studio. Run the following:

```shell
sudo apt-get install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
```

This installs [KVM](https://www.linux-kvm.org/page/Main_Page) which is a kernel-based virtual machine and libvirt the toolkit and API for KVM.

After that run `kvm-ok` to verify if the installation was successful.

Next, we add users to kvm and libvirt group:

```shell
sudo adduser `id -un` kvm
sudo adduser `id -un` libvirtd
```

Once this is completed log out and log in for changes to take effect.

Open the Ubuntu software center and search for Android Studio once found click the install button to start the installation. It takes a while so you can grab a cup of coffee while waiting. Launch the Android studio when it is completed and you should be presented with a screen similar to the screenshot below:

![Android Studio Startup ](https://res.cloudinary.com/dis3a42lz/image/upload/v1577390162/blog/setup-react-native/expo2.png "Android Studio Startup")

Click Configure and then click on SDK Manager on the dropdown that opens to open the SDK Manager.

![Android SDK Manager](https://res.cloudinary.com/dis3a42lz/image/upload/v1577390589/blog/setup-react-native/expo3.png "Android SDK Manager")

On the SDK Platform make sure you have at least the top 2 API levels installed and on the SDK tools make sure the Android Emulator, Android SDK Platform Tools, Android SDK Tools, and Google Play Services are installed. Once that is done click on Apply and then Ok.

Go back to the Start Screen and click on Configure and then AVD Manager on the dropdown that shows up to open the AVD Manager.

![Android Virtual Device](https://res.cloudinary.com/dis3a42lz/image/upload/v1577391376/blog/setup-react-native/expo4.png "Android Virtual Device")

Click on create a new virtual device on the screen that follows I suggest you pick a device with PlayStore support. On the Select a system image window, choose a system image and download it if it is not available.

Once that is completed click next and enter the name of the device, after that click on finish to be done setting up the virtual device.

Click on the play button on the start screen of the AVD to start up the virtual android device and give it some time to start up.

Go back to the expo dev tools in the browser and click on Run on Android Device/Emulator to start your android app on the emulator. You should have a screenshot similar to the one below.

![Expo and Android Emulator](https://res.cloudinary.com/dis3a42lz/image/upload/v1577400110/blog/setup-react-native/expo_5.png "Expo and Android Emulator")

At this point, the Android emulator is ready and you can start building and testing Android applications with React Native, Expo, and Android Studio.
