import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const publicDir = './public';

async function optimizeImages() {
    console.log('🖼️  Otimizando imagens...');

    const imagesToOptimize = [
        'dasboard-hero.webp',
        'dasboard-hausecare.webp',
        'imagens/screens/dasboard-hero.webp',
        'imagens/screens/dasboard-hausecare.webp'
    ];

    for (const imagePath of imagesToOptimize) {
        const fullPath = join(publicDir, imagePath);

        try {
            const info = await sharp(fullPath).metadata();
            console.log(`\n📸 ${imagePath}`);
            console.log(`   Original: ${(info.size / 1024).toFixed(2)} KB`);

            // Redimensionar para largura máxima de 1200px
            // E comprimir com qualidade 85
            await sharp(fullPath)
                .resize(1200, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({ quality: 82, effort: 6 })
                .toFile(fullPath.replace('.webp', '-optimized.webp'));

            const optimizedInfo = await sharp(fullPath.replace('.webp', '-optimized.webp')).metadata();
            console.log(`   Otimizado: ${(optimizedInfo.size / 1024).toFixed(2)} KB`);
            console.log(`   Economia: ${(((info.size - optimizedInfo.size) / info.size) * 100).toFixed(1)}%`);

            // Substituir o original
            await sharp(fullPath.replace('.webp', '-optimized.webp'))
                .toFile(fullPath);

        } catch (err) {
            console.log(`   ⚠️  Não encontrado ou erro: ${err.message}`);
        }
    }

    console.log('\n✅ Otimização concluída!');
}

optimizeImages();
