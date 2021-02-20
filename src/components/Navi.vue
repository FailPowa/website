<template>
    <div class="navi" v-on:mouseover="hover = true" v-on:mouseleave="hover = false">
		<font v-if="!hover" class="navi-hey animate__animated animate__fadeInUp animate__delay-1s" color="white">Hey !</font>
		<div v-if="hover" class="quest animate__animated animate__fadeInUp">
			<div class="quest-text">
				<p>Hey ! Listen !</p>
				<p v-if="nbGems == 0">Trouvons les 3 cristaux perdus sur ce site</p>
				<p v-if="nbGems == 1">Bien joué ! Encore 2 cristaux à trouver !</p>
				<p v-if="nbGems == 2">Wow ! Plus qu'un cristal restant !</p>
				<p v-if="nbGems == 3">Merci pour ton aide ! Voilà ta récompense</p>
			</div>
			<div v-if="nbGems != 3">
				<v-icon v-if="!redGem" class="red-gem" color="red" x-large>mdi-cards-diamond-outline</v-icon>
				<v-icon v-else class="red-gem animate__animated animate__pulse animate__infinite" color="red" x-large>mdi-cards-diamond</v-icon>
				<v-icon v-if="!greenGem" class="green-gem" color="green" x-large>mdi-cards-diamond-outline</v-icon>
				<v-icon v-else class="green-gem animate__animated animate__pulse animate__infinite" color="green" x-large>mdi-cards-diamond</v-icon>
				<v-icon v-if="!blueGem" class="blue-gem" color="blue" x-large>mdi-cards-diamond-outline</v-icon>
				<v-icon v-else class="blue-gem animate__animated animate__pulse animate__infinite" color="blue" x-large>mdi-cards-diamond</v-icon>
			</div>
			<div v-else>
				<v-icon 
					class="quest-chest animate__animated animate__heartBeat animate__infinite"
					color="orange"
					@click="questComplete"
					x-large
				>mdi-treasure-chest</v-icon>
			</div>
		</div>
		<div class="asa-g-e"></div>
		<div class="asa-g-d"></div>
		<div class="asa-p-e"></div>
		<div class="asa-p-d"></div>
		<div class="corpo"></div>		
	</div>
</template>
<script>
export default {
	name: 'Navi',
	data() {
		return {
			hover: false,
			gemCount: 0
		}
	},
	props: {
		redGem: Boolean,
		greenGem: Boolean,
		blueGem: Boolean,
		nbGems: Number
	},
	methods: {
		gemFound(color) {
			console.log(color);
		},
		questComplete() {
			console.log('ez');
		}
	}
}
</script>
<style scoped>
.navi {
	position: fixed;
	height: 150px;
    width: 150px;
	bottom: 5vh;
    right: 5vh;
	animation: voo 6s ease-in-out infinite;
}

@keyframes voo{
	0%, 100% {transform: translateY(0);}
	50% {transform: translateY(-25px);}
}

.navi-hey {
	position: absolute;
	bottom: 9vh;
	right: 5vh;
	font-size: 3vh;
}

/** Quest box */
.quest {
	position: absolute;
	width: 50vh;
	height: 10vh;
	background: aliceblue;
	bottom: 5vh;
	right: 5vh;
	border-top-left-radius: 2vh;
    border-top-right-radius: 2vh;
	border-bottom-left-radius: 2vh;
}

.quest-text {
	padding: 1vh;
	font-size: 2vh;
}

.red-gem {
	right: -40vh;
	top: -11vh;
}

.green-gem {
	right: -38vh;
	top: -8.5vh;
}

.blue-gem {
	right: -31.5vh;
	top: -6vh;
}
.quest-chest {
	right: -40vh;
	top: -7vh;
}
/** End Quest box */

/** Navi appearence & animations */
.corpo{
	position: absolute;
	height: 5vh;
	width: 5vh;
	background: #D5EDF5;
	border-radius: 50%;
	bottom: 0;
    right: 0;
	opacity: 0.98;
	box-shadow: 0 0 20px #5c67cf,
	0 0 40px rgba(187, 177, 230, 1),
	0 0 60px rgba(187, 177, 230, 0.6),
	0 0 80px rgba(187, 177, 230, 0.9),
	0 0 30px 70px rgba(250, 232, 130, 0.1);
	animation: cresce 1s infinite;
}

@keyframes cresce {
	50% {transform: scale(1.04);}
}

.asa-g-e{
	position: absolute;
	height: 5vh;
	width: 5vh;
    bottom: 5vh;
    right: 1vh;
	background: #fff;
	border-radius: 100% 5px 100% 10%;
	transform: rotate(-45deg);
	opacity: 0.7;
	box-shadow: 0 0 40px rgba(187, 177, 230, 1);
	animation: asa 3s infinite;
	transform-origin: 50% 100%;
}

@keyframes asa {
	0% {transform: rotate(-65deg);}
	12.5% {transform: rotate(-90deg);}
	25% {transform: rotate(-65deg);}
	50% {transform: rotate(-90deg);}
	100% {transform: rotate(-65deg);}
	
}

.asa-g-d{
	position: absolute;
	height: 5vh;
	width: 5vh;
    bottom: 5vh;
    right: -1vh;
	background: #fff;
	border-radius: 5px 100% 10%;
	opacity: 0.7;
	box-shadow: 0 0 40px rgba(187, 177, 230, 1);
	animation: asa-e 3s infinite;
	transform-origin: 50% 100%;
}

@keyframes asa-e{
	0% {transform: rotate(65deg);}
	12.5% {transform: rotate(90deg);}
	25% {transform: rotate(65deg);}
	50% {transform: rotate(90deg);}
	100% {transform: rotate(65deg);}
	
}

.asa-p-e{
	position: absolute;
	height: 2vh;
	width: 2vh;
    bottom: -1vh;
    right: 4vh;
	background: #fff;
	border-radius: 180% 30% 130% 25%;
	opacity: 0.7;
	box-shadow: 0 0 40px rgba(187, 177, 230, 1);
	animation: asa-p-e 3s linear infinite;
	transform-origin: 100% 0%;

}

@keyframes asa-p-e {
	0% {transform: rotate(15deg);}
	12.5% {transform: rotate(30deg);}
	25% {transform: rotate(15deg);}
	50% {transform: rotate(30deg);}
	100% {transform: rotate(15deg);}
	
}

.asa-p-d{
	position: absolute;
	height: 2vh;
	width: 2vh;
    bottom: -1vh;
    right: -0.5vh;
	background: #fff;
	border-radius: 30% 180% 25% 130%;
	opacity: 0.7;
	box-shadow: 0 0 40px rgba(187, 177, 230, 1);
	animation: asa-p-d 3s linear infinite;
	transform-origin: 50% 0%;
}

@keyframes asa-p-d {
	0% {transform: rotate(-15deg);}
	12.5% {transform: rotate(-30deg);}
	25% {transform: rotate(-15deg);}
	50% {transform: rotate(-30deg);}
	100% {transform: rotate(-15deg);}
}
/** End Navi appearence & animations */
</style>