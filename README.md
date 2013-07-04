NoMoCo
======

Adapation de la librairie PoMoCo (Arcbotics) en Node.js

L'idée de ce projet est de proposer une librairie orientée évènementiel pour contrôler le petit roboto Hexapod d'Arbotics : [Hexy](http://arcbotics.com/products/hexy/)

![Hexy](http://farm8.staticflickr.com/7073/7173400392_1f5d362a44.jpg)

## Pourquoi Node.js ?

D'une part parce que je suis en pleine apprentissage de cette technologie, et que pour apprendre, ba il faut des projets. D'autre part, node.js est parfaitement adapté à ce petit robot, qui est commandable par série (nous utiliserons le module serialport) et que l'idée d'avoir une interface web temps réel pour contrôler ce petit robot est très séduisante :)

## Modules

### Servo.js

Regroupe toutes les actions pour contrôler un servo-moteur

### Hexy.js

Regroupe toutes les actions pour contrôler l'hexapode