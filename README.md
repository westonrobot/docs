# Weston Robot Documentation Source

## Setup the development repository

You can use docker to build and preview the generated documentations site on your computer.

Following instructions [here](https://docs.docker.com/engine/install/ubuntu/) to install docker engine first. Here is a brief summary of the installation if you have never installed docker on your computer before:

```
$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Now you can clone the repository (or your forked repository):

```
$ cd Workspace
$ git clone https://github.com/westonrobot/docs.git
```

Build the docs:

```
$ sudo docker run --rm -v ${PWD}:/docs rduweston/sphinx-rtd make html
```

You can preview the pages by opening index.html inside the build/html folder.

```
$ firefox build/html/index.html
```

## Publish to the Github Page

You can create a pull request to the "main" branch. Once your pull request is merged, Github Actions will publish the updated pages automatically.

## Reference

* https://sphinx-rtd-theme.readthedocs.io/en/stable/demo/demo.html?highlight=color#topics-sidebars-and-rubrics
* https://www.sphinx-doc.org/en/master/usage/configuration.html
* https://documentation-style-guide-sphinx.readthedocs.io/en/latest/style-guide.html