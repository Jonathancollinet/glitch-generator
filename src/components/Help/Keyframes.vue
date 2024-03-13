<script setup lang="ts">
const ex1 =`@keyframes glitch {
	0% {
		text-shadow: 0px 0px 0px rgb(114 76 249);
	}
	50% {
		text-shadow: 50px 25px 0px rgb(255 0 0);
	}
}`

const ex2 = `@keyframes glitch {
	0% {
		text-shadow: 0px 0px 0px rgb(114 76 249), 0px 0px 0px rgb(114 76 249);
	}
	50% {
		text-shadow: 50px 25px 0px rgb(255 0 0), 50px 25px 0px rgb(255 0 0);
	}
}`

const ex3 = `@keyframes glitch {
	0% {
		text-shadow: 0px 0px 0px rgb(114 76 249), 0px 0px 0px rgb(114 76 249);
	}
	50%,
	75% {
		text-shadow: 50px 25px 0px rgb(255 0 0);
	}
}`

const fillEx1 = `@keyframes glitch {
	0% {
		text-shadow: 0px 0px 0px rgb(114 76 249), 0px 0px 0px rgb(114 76 249);
	}
	50% {
		text-shadow: 50px 25px 0px rgb(255 0 0);
	}
	75% {
		text-shadow: 50px 25px 0px rgb(219 255 0);
	}
}`;

const fillEx2 = `@keyframes glitch {
	0%,
	1%,
	2%,
	3%,
	4%,
	5%,
	6%,
	7%,
	8%,
	9%,
	10%,
	11%,
	12%,
	13%,
	14%,
	15%,
	16%,
	17%,
	18%,
	19%,
	20%,
	21%,
	22%,
	23%,
	24%,
	25%,
	26%,
	27%,
	28%,
	29%,
	30%,
	31%,
	32%,
	33%,
	34%,
	35%,
	36%,
	37%,
	38%,
	39%,
	40%,
	41%,
	42%,
	43%,
	44%,
	45%,
	46%,
	47%,
	48%,
	49% {
		text-shadow: 0px 0px 0px rgb(114 76 249), 0px 0px 0px rgb(114 76 249);
	}
	50%,
	51%,
	52%,
	53%,
	54%,
	55%,
	56%,
	57%,
	58%,
	59%,
	60%,
	61%,
	62%,
	63%,
	64%,
	65%,
	66%,
	67%,
	68%,
	69%,
	70%,
	71%,
	72%,
	73%,
	74% {
		text-shadow: 50px 25px 0px rgb(255 0 0), 0px 0px 0px rgb(114 76 249);
	}
	75%,
	76%,
	77%,
	78%,
	79%,
	80%,
	81%,
	82%,
	83%,
	84%,
	85%,
	86%,
	87%,
	88%,
	89%,
	90%,
	91%,
	92%,
	93%,
	94%,
	95%,
	96%,
	97%,
	98%,
	99%,
	100% {
		text-shadow: 50px 25px 0px rgb(255 0 0), 50px 25px 0px rgb(219 255 0);
	}
}`
</script>

<template>
    <div>
        <UiHeading variant="h3">{{ $t('pages.help.keyframes.title') }}</UiHeading>
        <UiText>{{ $t('pages.help.keyframes.what') }}</UiText>
        <div class="space-y-1 pl-4 mb-4">
            <UiText as="div">- {{ $t('pages.help.keyframes.how') }}</UiText>
            <UiText as="div">- {{ $t('pages.help.keyframes.range') }}</UiText>
            <UiText as="div">- {{ $t('pages.help.keyframes.field') }}</UiText>
        </div>
        <UiText>{{ $t('pages.help.keyframes.multipleRanges') }}</UiText>
        <UiText>{{ $t('pages.help.keyframes.exemple') }}</UiText>
        <img class="mb-4" src="/help/kf_ex1.png">
        <UiText>{{ $t('pages.help.keyframes.result') }}</UiText>
        <UiPre class="mb-4">{{ ex1 }}</UiPre>
        <UiText>{{ $t('pages.help.keyframes.exemple2') }}</UiText>
        <img class="mb-4" src="/help/kf_ex2.png">
        <UiText>{{ $t('pages.help.keyframes.result2') }}</UiText>
        <UiPre class="mb-4">{{ ex2 }}</UiPre>
        <UiText>{{ $t('pages.help.keyframes.result2bis') }}</UiText>
        <UiText>{{ $t('pages.help.keyframes.exemple3') }}</UiText>
        <img class="mb-4" src="/help/kf_ex3.png">
        <UiText>{{ $t('pages.help.keyframes.result3') }}</UiText>
        <UiPre class="mb-4">{{ ex3 }}</UiPre>
        <UiText>{{ $t('pages.help.keyframes.result3bis') }}</UiText>
        <UiText>{{ $t('pages.help.keyframes.fillExemple3') }}</UiText>
        <img class="mb-4" src="/help/kf_fill2.png">
        <UiPre class="mb-4">{{ fillEx1 }}</UiPre>
        <UiText>{{ $t('pages.help.keyframes.fillExemple3result') }}</UiText>
        <UiText>{{ $t('pages.help.keyframes.introduceFill') }}</UiText>
        <div class="flex space-x-4 mb-4">
            <img class="mb-4" src="/help/kf_fill.png">
            <div class="mt-2">
                <UiText>- {{ $t('pages.help.keyframes.fill') }}</UiText>
                <UiText>- {{ $t('pages.help.keyframes.fillExemple') }}</UiText>
                <UiText>- {{ $t('pages.help.keyframes.fillExemple2') }}</UiText>
            </div>
        </div>
        <UiText>{{ $t('pages.help.keyframes.fillExemple3resultbis') }}</UiText>
        <UiText>{{ $t('pages.help.keyframes.fillExemple4') }}</UiText>
        <img class="mb-4" src="/help/kf_fill3.png">
        <UiText>{{ $t('pages.help.keyframes.fillExemple4result') }}</UiText>
        <UiPre class="mb-4 h-[200px]">{{ fillEx2 }}</UiPre>
        <UiText>{{ $t('pages.help.keyframes.fillExemple4resultbis') }}</UiText>
        <UiText>{{ $t('pages.help.keyframes.fillDefault') }}</UiText>
        <UiText>{{ $t('pages.help.keyframes.fillImportant') }}</UiText>
        <UiText>{{ $t('pages.help.keyframes.mistakes') }}</UiText>
    </div>
</template>