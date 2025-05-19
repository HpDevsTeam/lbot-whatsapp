import {formatSeconds, showConsoleLibraryError} from './general.util.js'
import {instagramGetUrl} from 'instagram-url-direct'
import { getFbVideoInfo } from 'fb-downloader-scrapper'
import Tiktok from '@tobyg74/tiktok-api-dl'
import axios from 'axios'
import yts from 'yt-search'
import { FacebookMedia, InstagramMedia, TiktokMedia, XMedia, YTInfo } from '../interfaces/library.interface.js'
import botTexts from '../helpers/bot.texts.helper.js'
import crypto from 'node:crypto'

export async function xMedia (url: string){
    try {
        const newURL = url.replace(/twitter\.com|x\.com/g, 'api.vxtwitter.com')
        const {data : xResponse} = await axios.get(newURL)

        if (!xResponse.media_extended){
            return null
        } 

        const xMedia : XMedia = {
            text: xResponse.text,
            media : xResponse.media_extended.map((media : {type: string, url: string}) => {
                return {
                    type: (media.type === 'video') ? 'video' : 'image',
                    url: media.url
                }
            })
        }
    
        return xMedia
    } catch(err) {
        showConsoleLibraryError(err, 'xMedia')
        throw new Error(botTexts.library_error)
    }
}

export async function tiktokMedia (url : string){
    try {
        const tiktokResponse = await Tiktok.Downloader(url, {version: "v1"})
        let mediaUrl: string | string[]

        if (tiktokResponse.status === 'error') {
            return null
        }

        if (tiktokResponse.result?.type == 'video'){
            if (tiktokResponse.result?.video?.playAddr?.length) {
                mediaUrl = tiktokResponse.result?.video?.playAddr[0]
            } else {
                return null
            } 
        } else if(tiktokResponse.result?.type == 'image'){
            if (tiktokResponse.result?.images) {
                mediaUrl = tiktokResponse.result?.images
            } else {
                return null
            }
        } else {
            return null
        }

        const tiktokMedia : TiktokMedia = {
            author_profile: tiktokResponse.result?.author?.nickname,
            description : tiktokResponse.result?.desc,
            type: tiktokResponse.result?.type,
            duration: tiktokResponse.result?.type == "video" ? parseInt(((tiktokResponse.result?.video?.duration as number)/1000).toFixed(0)) : null,
            url: mediaUrl
        }

        return tiktokMedia
    } catch(err) {
        showConsoleLibraryError(err, 'tiktokMedia')
        throw new Error(botTexts.library_error)
    }
}

export async function facebookMedia(url : string) {
    try {
        const facebookResponse = await getFbVideoInfo(url)
        const facebookMedia : FacebookMedia = {
            url: facebookResponse.url,
            duration: parseInt((facebookResponse.duration_ms/1000).toFixed(0)),
            sd: facebookResponse.sd,
            hd: facebookResponse.hd,
            title: facebookResponse.title,
            thumbnail: facebookResponse.thumbnail
        }

        return facebookMedia
    } catch(err) {
        showConsoleLibraryError(err, 'facebookMedia')
        throw new Error(botTexts.library_error)
    }
}

export async function instagramMedia (url: string){
    try {
        const instagramResponse = await instagramGetUrl(url)
        let instagramMedia : InstagramMedia = {
            author_username : instagramResponse.post_info.owner_username,
            author_fullname: instagramResponse.post_info.owner_fullname,
            caption: instagramResponse.post_info.caption,
            likes: instagramResponse.post_info.likes,
            media : []
        }

        for (const url of instagramResponse.url_list) {
            const {headers} = await axios.head(url)
            const type = headers['content-type'] === 'video/mp4' ? 'video' : 'image'
            instagramMedia.media.push({type, url})                  
        }

        return instagramMedia
    } catch(err) {
        showConsoleLibraryError(err, 'instagramMedia')
        throw new Error(botTexts.library_error)
    }
}



export async function youtubeMedia (text : string, format: '360' | '480' | '720' | '1080' | 'mp3'){
    try {
        const savetube = {
            validQueryDomains: new Set([
                "youtube.com",
                "www.youtube.com",
                "m.youtube.com",
                "music.youtube.com",
                "gaming.youtube.com",
            ]),
            validPathDomains: /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts|live)\/)/,
            api: {
                base: "https://media.savetube.me/api",
                cdn: "/random-cdn",
                info: "/v2/info",
                download: "/download"
            },
            headers: {
                'accept': '*/*',
                'content-type': 'application/json',
                'origin': 'https://yt.savetube.me',
                'referer': 'https://yt.savetube.me/',
                'user-agent': 'Postify/1.0.0'
            },
            getURLVideoID: (link: string) => {
                const idRegex = /^[a-zA-Z0-9-_]{11}$/;
                const parsed = new URL(link.trim())
                let id = parsed.searchParams.get("v")
    
                if (savetube.validPathDomains.test(link.trim()) && !id) {
                    const paths = parsed.pathname.split("/");
                    id = parsed.host === "youtu.be" ? paths[1] : paths[2]
                } else if (parsed.hostname && !savetube.validQueryDomains.has(parsed.hostname)) {
                    throw Error("Not a YouTube domain");
                }
    
                if (!id) {
                    throw Error(`No video id found: "${link}"`);
                }
    
                id = id.substring(0, 11);
                if (!savetube.validateID(id)) {
                    throw TypeError(`Video id (${id}) does not match expected ` + `format (${idRegex.toString()})`);
                }
    
                return id
            },
            validateURL: (text: string) => {
                try {
                  savetube.getURLVideoID(text);
                  return true;
                } catch (e) {
                  return false;
                }
            },
            validateID: (id: string) => {
                const idRegex = /^[a-zA-Z0-9-_]{11}$/
                return idRegex.test(id.trim())
            },
            getVideoID: (url: string) => {
                const urlRegex = /^https?:\/\//;
                if (savetube.validateID(url)) {
                  return url;
                } else if (urlRegex.test(url.trim())) {
                  return savetube.getURLVideoID(url)
                } else {
                  throw Error(`No video id found: ${url}`)
                }
            },
            crypto: {
                hexToBuffer: (hexString: any) => {
                   const matches = hexString.match(/.{1,2}/g)
                   return Buffer.from(matches.join(''), 'hex')
                },
                decrypt: async (enc: any) => {
                   try {
                      const secretKey = 'C5D58EF67A7584E4A29F6C35BBC4EB12';
                      const data = Buffer.from(enc, 'base64');
                      const iv = data.slice(0, 16);
                      const content = data.slice(16);
                      const key = savetube.crypto.hexToBuffer(secretKey);
                      const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
                      let decrypted = decipher.update(content);
                      decrypted = Buffer.concat([decrypted, decipher.final()]);
                      return JSON.parse(decrypted.toString());
                   } catch (error: any) {
                      throw new Error(error)
                   }
                }
            },
            request: async (endpoint: any, data = {}, method = 'post') => {
                try {
                    const { data: response} = await axios({
                        method,
                        url: `${endpoint.startsWith('http') ? '' : savetube.api.base}${endpoint}`,
                        data: method === 'post' ? data : undefined,
                        params: method === 'get' ? data : undefined,
                        headers: savetube.headers
                    })

                    return {
                        status: true,
                        code: 200,
                        data: response
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            },
            getCDN: async () => {
                const response = await savetube.request(savetube.api.cdn, {}, 'get')

                if (!response.status) throw new Error(response as any)

                return {
                    status: true,
                    code: 200,
                    data: response.data.cdn
                }
            },
            download: async (videoId: any, format: '360' | '480' | '720' | '1080' | 'mp3') => {
                try {
                    const cdnx = await savetube.getCDN()

                    if (!cdnx.status) return cdnx

                    const cdn = cdnx.data;
                    const result = await savetube.request(`https://${cdn}${savetube.api.info}`, {
                        url: `https://www.youtube.com/watch?v=${videoId}`
                    })

                    if (!result.status) return result

                    const decrypted = await savetube.crypto.decrypt(result.data.data); 
                    let dl

                    try {
                        dl = await savetube.request(`https://${cdn}${savetube.api.download}`, {
                            id: videoId,
                            downloadType: format === 'mp3' ? 'audio' : 'video',
                            quality: format === 'mp3' ? '128' : format,
                            key: decrypted.key
                        });
                    } catch (error: any) {
                        throw new Error(error)
                    }

                    return {
                        status: true,
                        code: 200,
                        result: {
                            title: decrypted.title || "Desconhecido",
                            type: format === 'mp3' ? 'audio' : 'video',
                            format: format,
                            thumbnail: decrypted.thumbnail || `https://i.ytimg.com/vi/${videoId}/0.jpg`,
                            download: dl.data.data.downloadUrl,
                            id: videoId,
                            key: decrypted.key,
                            duration: decrypted.duration,
                            quality: format === 'mp3' ? '128' : format,
                            downloaded: dl.data.data.downloaded
                        }
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        }

        const isURLValid = savetube.validateURL(text)
        let videoId : string | undefined

        if (isURLValid) {
            videoId = savetube.getVideoID(text)
        } else {
            const { videos } = await yts(text)

            if (!videos.length) videoId = undefined
            else videoId = videos[0].videoId
        }

        if (!videoId) return null
    
        const savetubeInfo = await savetube.download(videoId, format) as any
        const ytInfo : YTInfo = {
            id_video : savetubeInfo.result.id as string,
            title:  savetubeInfo.result.title as string,
            duration: Number(savetubeInfo.result.duration),
            duration_formatted: formatSeconds(Number(savetubeInfo.result.duration)),
            url: savetubeInfo.result.download
        }
        
        return ytInfo
    } catch(err) {
        showConsoleLibraryError(err, 'youtubeMedia')
        throw new Error(botTexts.library_error)
    }
}