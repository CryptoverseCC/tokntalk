import requests
import json
import shutil
import os

assets = requests.get('https://api.opensea.io/asset_contracts/').json()

os.makedirs('assets/img', exist_ok=True)

os.makedirs

"""
{
    network: 'ethereum',
    address: '0xdde2d979e8d39bb8416eafcfc1758f3cab2c9c72',
    name: 'Known Origin',
    symbol: 'KODA',
    logo: knownorigin,
    coverImage: knownoriginCover,
    primaryColor: '#121212',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(200,249,255,0.6)',
},
"""
erc20js = []

"""
{
    address: '0x323a3e1693e7a0959f65972f3bf2dfcb93239dfe',
    name: 'DigitalArtChain',
    symbol: 'DAC',
    image_url: 'https://storage.googleapis.com/opensea-static/digitalartchain-logo.png',
    external_link: 'http://digitalartchain.com/',
    entityPrefix: 'Digital Art ',
},
"""
erc721js = []

for asset in assets:
    erc721js.append({
        "address": asset["address"],
        "name": asset["name"],
        "symbol": asset["symbol"],
        "image_url": asset["image_url"],
        "external_link": asset["external_link"],
        "entityPrefix": "Prefix (TODO/FIXME) ",
    })
    erc20js.append({
        "network": 'ethereum',
        "address": asset["address"],
        "name": asset["name"],
        "symbol": asset["symbol"],
        "logo": "TODO",
        "coverImage": "TODO",
        "primaryColor": '#121212',
        "secondaryColor": '#ffffff',
        "shadowColor": 'rgba(200,249,255,0.6)',
    })

    if asset["image_url"]:
        response = requests.get(asset["image_url"], stream=True)
        slug = asset["image_url"].split('/')[-1]
        with open('assets/img/{}'.format(slug), 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)

with open('assets/erc721js', 'w') as erc721file, open('assets/erc20js', 'w') as erc20file:
    erc721file.write(json.dumps(erc721js, indent=2))
    erc20file.write(json.dumps(erc20js, indent=2))
