<script lang="ts" setup>
import { Urls } from '~/types/enums';

useSeoMeta({
    title: 'Glitch Generator - Home',
    ogTitle: 'Glitch Generator - Home',
    description: 'Glitch editor based on the text-shadow & box-shadow CSS properties. Create and export your animation as code.',
    ogDescription: 'Glitch editor based on the text-shadow & box-shadow CSS properties. Create and export your animation as code.',
    ogImage: ''
});

const editorRoute = useNavigationItem(Urls.Editor)?.to;
</script>

<template>
    <div class="flex flex-col items-center">
        <UiHeading class="w-2 relative text-center flex justify-center uppercase break-words">
            {{ $t('pages.home.title') }}
        </UiHeading>
        <UiText as="p" class="text-center">
            {{ $t('pages.home.description') }}
        </UiText>
        <UiHeading variant="h2" class="relative text-center flex justify-center uppercase break-words">
            {{ $t('pages.home.create.title') }}
        </UiHeading>
        <UiText as="p" class="text-center">
            {{ $t('pages.home.create.description') }}
        </UiText>
        <div class="my-12 mb-20">
            <UiText as="div" data-size="big" data-color="black" class="exemple text-center mb-16 font-bold tracking-widest">
                {{ $t('pages.home.create.result') }}
            </UiText>
            <!-- <UiText as="p" class="text-center">
            {{ $t('pages.home.why.also') }}
        </UiText> -->
            <UiText as="div" data-size="big" data-color="black" class="exemple2 text-center font-bold tracking-widest">
                {{ $t('pages.home.create.result2') }}
            </UiText>
        </div>
        <UiHeading variant="h2" class="relative text-center flex justify-center uppercase break-words">
            {{ $t('pages.home.import.title') }}
        </UiHeading>
        <UiText as="p" class="text-center">
            {{ $t('pages.home.import.description') }}
        </UiText>
        <UiHeading variant="h2" class="relative text-center flex justify-center uppercase break-words">
            {{ $t('pages.home.share.title') }}
        </UiHeading>
        <UiText as="p" class="text-center">
            {{ $t('pages.home.share.description') }}
        </UiText>
        <UiLink class="mt-2" v-if="editorRoute" :to="editorRoute">
            <UiButton as="div">
                {{ $t('pages.home.share.button') }}
            </UiButton>
        </UiLink>
    </div>
</template>

<style scoped>
.exemple {
    animation: _glitch 3s steps(100) infinite;
}

.exemple2 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 42px;
    height: 0px;
    padding: 0px;
    border-radius: 0px;
    background-color: rgb(255 255 255 / 0%);
    animation-name: neons;
    animation-duration: 3000ms;
    animation-timing-function: steps(100);
    animation-iteration-count: infinite;
    animation-play-state: running;
}

@keyframes neons {
    0% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    1% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 17px rgb(255 0 222), 0px 0px 38px rgb(255 0 222);
    }

    4% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 17px rgb(255 0 222), 0px 0px 38px rgb(255 0 222);
    }

    7% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    8% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 17px rgb(255 0 222), 0px 0px 38px rgb(255 0 222);
    }

    12% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    22% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    23% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 15px rgb(255 153 222), 0px 0px 20px rgb(255 0 222), 0px 0px 30px rgb(255 0 222), 0px 0px 40px rgb(255 0 222);
    }

    26% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    28% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 17px rgb(255 0 222), 0px 0px 38px rgb(255 0 222);
    }

    34% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 15px rgb(255 153 222), 0px 0px 20px rgb(255 0 222), 0px 0px 30px rgb(255 0 222), 0px 0px 40px rgb(255 0 222);
    }

    36% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    42% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 17px rgb(255 0 222), 0px 0px 38px rgb(255 0 222);
    }

    55% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 15px rgb(255 153 222), 0px 0px 20px rgb(255 0 222), 0px 0px 30px rgb(255 0 222), 0px 0px 40px rgb(255 0 222);
    }

    60% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    63% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 15px rgb(255 153 222), 0px 0px 20px rgb(255 0 222), 0px 0px 30px rgb(255 0 222), 0px 0px 40px rgb(255 0 222);
    }

    67% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    72% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    73% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 17px rgb(255 0 222), 0px 0px 38px rgb(255 0 222);
    }

    76% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    78% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 17px rgb(255 0 222), 0px 0px 38px rgb(255 0 222);
    }

    84% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 15px rgb(255 153 222), 0px 0px 20px rgb(255 0 222), 0px 0px 30px rgb(255 0 222), 0px 0px 40px rgb(255 0 222);
    }

    86% {
        text-shadow: 0px 0px 0px rgb(109 86 105), 0px 0px 3px rgb(99 88 97), 0px 0px 5px rgb(99 88 97);
    }

    96% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 17px rgb(255 0 222), 0px 0px 38px rgb(255 0 222);
    }

    100% {
        text-shadow: 0px 0px 0px rgb(255 85 222), 0px 0px 5px rgb(255 153 222), 0px 0px 10px rgb(255 153 222), 0px 0px 15px rgb(255 153 222), 0px 0px 20px rgb(255 0 222), 0px 0px 30px rgb(255 0 222), 0px 0px 40px rgb(255 0 222);
    }
}

@keyframes _glitch {
    0% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    1% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    2% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    3% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    4% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    5% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    6% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    7% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    8% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    9% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    10% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    11% {
        text-shadow: 1px 0px 3px #ff0000, -1px 0px 3px #32cd32;
    }

    12% {
        text-shadow: 1px 0px 3px #ff0000, -1px 0px 3px #32cd32;
    }

    13% {
        text-shadow: 1px 0px 3px #ff0000, -1px 0px 3px #32cd32;
    }

    14% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    15% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    16% {
        text-shadow: -3px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    17% {
        text-shadow: -3px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    18% {
        text-shadow: -3px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    19% {
        text-shadow: -3px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    20% {
        text-shadow: -3px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    21% {
        text-shadow: 0.8px 0px 0px #0c33f5, 0.8px 0px 0px #32cd32;
    }

    22% {
        text-shadow: 0.8px 0px 0px #0c33f5, 0.8px 0px 0px #32cd32;
    }

    23% {
        text-shadow: 0.8px 0px 0px #0c33f5, 0.8px 0px 0px #32cd32;
    }

    24% {
        text-shadow: 0.8px 0px 0px #0c33f5, 0.8px 0px 0px #32cd32;
    }

    25% {
        text-shadow: 0.8px 0px 0px #0c33f5, 0.8px 0px 0px #32cd32;
    }

    26% {
        text-shadow: 0.8px 0px 3px #0c33f5, -0.8px 0px 3px #32cd32;
    }

    27% {
        text-shadow: 0.8px 0px 3px #0c33f5, -0.8px 0px 3px #32cd32;
    }

    28% {
        text-shadow: 0.8px 0px 0px #0c33f5, -0.8px 0px 0px #32cd32;
    }

    29% {
        text-shadow: 0.8px 0px 0px #0c33f5, -0.8px 0px 0px #32cd32;
    }

    30% {
        text-shadow: 0.8px 0px 0px #0c33f5, -0.8px 0px 0px #32cd32;
    }

    31% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    32% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    33% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    34% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    35% {
        text-shadow: -3px 0px 3px #0c33f5, 3px 0px 3px #32cd32;
    }

    36% {
        text-shadow: -3px 0px 3px #0c33f5, 3px 0px 3px #32cd32;
    }

    37% {
        text-shadow: -3px 0px 3px #0c33f5, 3px 0px 3px #32cd32;
    }

    38% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    39% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    40% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    41% {
        text-shadow: 45px 0px 0px #0c33f5, -45px 0px 0px #32cd32;
    }

    42% {
        text-shadow: 0px 0px 0px #0c33f5, 0px 0px 0px #32cd32;
    }

    43% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    44% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    45% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    46% {
        text-shadow: 1px 0px 3px #ff0000, -1px 0px 3px #32cd32;
    }

    47% {
        text-shadow: 1px 0px 3px #ff0000, -1px 0px 3px #32cd32;
    }

    48% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #32cd32;
    }

    49% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #32cd32;
    }

    50% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #32cd32;
    }

    51% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    52% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    53% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    54% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    55% {
        text-shadow: 3px 0px 3px #ff0000, -3px 0px 3px #0c33f5;
    }

    56% {
        text-shadow: -3px 0px 3px #ff0000, 3px 0px 3px #0c33f5;
    }

    57% {
        text-shadow: -3px 0px 3px #ff0000, 3px 0px 3px #0c33f5;
    }

    58% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    59% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    60% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    61% {
        text-shadow: 30px 0px 0px #32cd32, -30px 0px 0px #32cd32;
    }

    62% {
        text-shadow: 0px 0px 0px #32cd32, 0px 0px 0px #32cd32;
    }

    63% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #0c33f5;
    }

    64% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #0c33f5;
    }

    65% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #0c33f5;
    }

    66% {
        text-shadow: 1px 0px 3px #ff0000, -1px 0px 3px #0c33f5;
    }

    67% {
        text-shadow: -3px 0px 3px #ff0000, 3px 0px 3px #0c33f5;
    }

    68% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    69% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    70% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    71% {
        text-shadow: 50px 0px 0px #ff0000, -50px 0px 0px #0c33f5;
    }

    72% {
        text-shadow: 0px 0px 0px #ff0000, 0px 0px 0px #0c33f5;
    }

    73% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    74% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    75% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    76% {
        text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #0c33f5;
    }

    77% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    78% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    79% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    80% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #0c33f5;
    }

    81% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    82% {
        text-shadow: 1px 0px 0px #ff0000, -1px 0px 0px #32cd32;
    }

    83% {
        text-shadow: 1px 0px 3px #ff0000, -1px 0px 3px #32cd32;
    }

    84% {
        text-shadow: 1px 0px 3px #ff0000, -1px 0px 3px #32cd32;
    }

    85% {
        text-shadow: 1px 0px 3px #ff0000, -1px 0px 3px #32cd32;
    }

    86% {
        text-shadow: -3px 0px 3px #ff0000, 3px 0px 3px #32cd32;
    }

    87% {
        text-shadow: -3px 0px 3px #ff0000, 3px 0px 3px #32cd32;
    }

    88% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #32cd32;
    }

    89% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #32cd32;
    }

    90% {
        text-shadow: -3px 0px 0px #ff0000, 3px 0px 0px #32cd32;
    }

    91% {
        text-shadow: 60px 0px 0px #32cd32, -60px 0px 0px #0c33f5;
    }

    92% {
        text-shadow: 0px 0px 0px #32cd32, 0px 0px 0px #0c33f5;
    }

    93% {
        text-shadow: 0.8px 0px 0px #0c33f5, -0.8px 0px 0px #32cd32;
    }

    94% {
        text-shadow: 0.8px 0px 0px #0c33f5, -0.8px 0px 0px #32cd32;
    }

    95% {
        text-shadow: 0.8px 0px 0px #0c33f5, -0.8px 0px 0px #32cd32;
    }

    96% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    97% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    98% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }

    99% {
        text-shadow: -3px 0px 0px #0c33f5, 3px 0px 0px #32cd32;
    }
}
</style>