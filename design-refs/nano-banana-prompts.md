# Nano Banana prompts voor Arka V2

Prompts voor fal.ai nano-banana-2 om atmospheric imagery te genereren die past bij de light editorial premium stijl. Genereren pas na goedkeuring van Kaan.

## Hero atmosphere alternatief (universeler dan atelier)

```
soft morning light falling across a minimalist cream colored interior wall, single ray angled from top left, subtle dust particles, warm paper texture, no people, no furniture, Kinfolk editorial magazine aesthetic, fine grain film photography, 50mm lens, shallow depth of field, cream #FAFAF7 wall tones, natural shadows, serene quiet composition, ratio 16:9
```

Model: `fal-ai/nano-banana-2`, size: `landscape_16_9`.

## Case study accent image

```
top down flat lay of a clean workspace, linen desk mat cream color, brass fountain pen, folded newspaper with blurred type, single cup of black coffee in ceramic, natural soft window light from left, editorial Monocle magazine style, muted palette, no logos, no branding, fine grain, 35mm film aesthetic, ratio 4:3
```

## Packages section background

```
abstract paper fold composition, single soft fold line diagonal across a sheet of cream colored archival paper, warm sunlight raking across the surface at a low angle, extreme shallow depth of field, zero color except cream and warm shadow, large negative space, minimalist editorial, ratio 3:2
```

## Over-ons portrait replacement

```
silhouette of a person seen from behind working at a desk near a large window, cream interior tones, only back of head visible, golden hour light flooding from right, warm bokeh, no identifiable features, editorial founder story aesthetic, Kinfolk style, 85mm lens, ratio 3:4
```

## Closing CTA backdrop

```
single subtle arrow shape made of negative space in cream colored folded paper, top down shot, soft shadow on the left side, very large white space around the arrow, editorial minimalist, warm neutral palette, high end magazine aesthetic, ratio 16:9
```

## Workflow bij goedkeuring

```python
import fal_client, urllib.request
result = fal_client.subscribe('fal-ai/nano-banana-2', arguments={
    'prompt': '...prompt from above...',
    'image_size': 'landscape_16_9',
    'num_images': 1,
})
url = result['images'][0]['url']
urllib.request.urlretrieve(url, 'public/brand/v2/hero-atmosphere.png')
```

Alle outputs in `public/brand/v2/` met duidelijke namen (`hero-atmosphere.png`, `cases-flatlay.png`, etc). Na generatie referentie toevoegen aan relevante secties via `next/image`.
