import pptxgen from "pptxgenjs";
import { SlideData } from "../data/slides";

export const exportToPPTX = async (slides: SlideData[]) => {
  const pres = new pptxgen();

  pres.layout = 'LAYOUT_16x9';

  const bgColor = "F8FAFC";
  const textColor = "0F172A";
  const accentColor = "3B82F6";
  const mutedColor = "475569";
  const cardColor = "FFFFFF";

  slides.forEach((slideData) => {
    const slide = pres.addSlide();
    slide.background = { color: bgColor };

    // Standard headers for most slide types
    if (slideData.type !== 'hero' && slideData.title) {
        slide.addText(slideData.title, {
            x: 0.8, y: 0.8, w: '90%', h: 0.8,
            fontSize: 32, bold: true, color: textColor, fontFace: "Arial"
        });
        if (slideData.subtitle) {
            slide.addText(slideData.subtitle, {
                x: 0.8, y: 1.5, w: '90%', h: 0.5,
                fontSize: 16, color: mutedColor, fontFace: "Arial"
            });
        }
    }

    switch (slideData.type) {
        case 'hero':
            slide.addText(slideData.title, {
                x: '10%', y: '30%', w: '80%', h: 1.5,
                fontSize: 54, bold: true, color: accentColor, align: 'center', fontFace: "Arial"
            });
            if (slideData.subtitle) {
                slide.addText(slideData.subtitle, {
                    x: '10%', y: '45%', w: '80%', h: 1,
                    fontSize: 20, color: textColor, align: 'center', fontFace: "Arial"
                });
            }
             if (slideData.metrics) {
                let metricsX = 2; // Center horizontally somewhat
                let spacing = 9 / slideData.metrics.length; 
                if (spacing > 3.5) spacing = 3.5;
                metricsX = (10 - (spacing * (slideData.metrics.length - 1) + 2)) / 2; // Auto-center
                
                slideData.metrics.forEach((m) => {
                    slide.addShape(pres.ShapeType.rect, { x: metricsX - 0.2, y: '65%', w: 2.4, h: 1.2, fill: { color: cardColor }, line: { color: "E2E8F0" }, roundness: 0.1 });
                    slide.addText(m.value, { x: metricsX, y: '66%', w: 2, h: 0.6, fontSize: 24, bold: true, color: accentColor, align: 'center', fontFace: "Arial" });
                    slide.addText(m.label, { x: metricsX, y: '72%', w: 2, h: 0.4, fontSize: 11, color: mutedColor, align: 'center', fontFace: "Arial", bold: true });
                    metricsX += spacing;
                });
            }
            if (slideData.footer) {
                slide.addText(slideData.footer, {
                    x: '10%', y: '90%', w: '80%', h: 0.5,
                    fontSize: 10, color: mutedColor, align: 'center'
                });
            }
            break;

        case 'problem':
        case 'solution':
        case 'contact':
            if (slideData.content) {
                 slide.addText(slideData.content.map(text => ({ text, options: { bullet: true } })), {
                    x: 0.8, y: 2.2, w: '85%', h: 4,
                    fontSize: 22, color: textColor, fontFace: "Arial", lineSpacing: 40
                });
            }
             if (slideData.footer) {
                slide.addText(slideData.footer, {
                    x: 0.8, y: '90%', w: '90%', h: 0.5,
                    fontSize: 12, color: mutedColor, align: 'left'
                });
            }
            break;

        case 'market':
            if (slideData.items) {
                 let xPos = 0.8;
                 let yPos = 2.4;
                 slideData.items.forEach((item, index) => {
                     // Adding card background
                     slide.addShape(pres.ShapeType.rect, { x: xPos, y: yPos, w: 3.8, h: 1.8, fill: { color: cardColor }, line: { color: "E2E8F0" }, roundness: 0.1 });
                     
                     slide.addText(item.value, { x: xPos + 0.3, y: yPos + 0.3, w: 3.2, h: 0.8, fontSize: 28, bold: true, color: accentColor });
                     slide.addText(item.label, { x: xPos + 0.3, y: yPos + 1.1, w: 3.2, h: 0.5, fontSize: 14, color: mutedColor });
                     
                     xPos += 4.2;
                     if ((index + 1) % 2 === 0) {
                         xPos = 0.8;
                         yPos += 2.0;
                     }
                 });
            }
            break;
            
        case 'timeline':
            if (slideData.items) {
                 let tYPos = 2.4;
                 slideData.items.forEach((item) => {
                     slide.addShape(pres.ShapeType.rect, { x: 0.8, y: tYPos, w: 8.4, h: 1, fill: { color: cardColor }, line: { color: "E2E8F0" }, roundness: 0.1 });
                     slide.addText(item.date, { x: 1.0, y: tYPos + 0.25, w: 2, h: 0.5, fontSize: 13, bold: true, color: accentColor });
                     slide.addText(item.title, { x: 2.6, y: tYPos + 0.1, w: 6.4, h: 0.4, fontSize: 16, bold: true, color: textColor });
                     slide.addText(item.desc, { x: 2.6, y: tYPos + 0.5, w: 6.4, h: 0.4, fontSize: 12, color: mutedColor });
                     tYPos += 1.2;
                 });
            }
            break;
            
        case 'team':
             if (slideData.items) {
                 let pXPos = 0.8;
                 let pYPos = 2.4;
                 let rowsCount = Math.ceil(slideData.items.length / 3);
                 
                 slideData.items.forEach((member, index) => {
                     let initials = member.name.split(' ').map(n => n[0]).join('');
                     
                     slide.addShape(pres.ShapeType.rect, { x: pXPos, y: pYPos, w: 2.4, h: 3, fill: { color: cardColor }, line: { color: "E2E8F0" }, roundness: 0.1 });
                     
                     // Draw circle for avatar
                     slide.addShape(pres.ShapeType.ellipse, { x: pXPos + 0.6, y: pYPos + 0.3, w: 1.2, h: 1.2, fill: { color: "F1F5F9" }, line: { color: textColor, width: 1.5 } });
                     slide.addText(initials, { x: pXPos + 0.6, y: pYPos + 0.3, w: 1.2, h: 1.2, fontSize: 18, color: textColor, align: 'center', valign: 'middle' });
                     
                     slide.addText(member.name, { x: pXPos + 0.1, y: pYPos + 1.8, w: 2.2, h: 0.4, fontSize: 14, bold: true, color: textColor, align: 'center' });
                     slide.addText(member.role, { x: pXPos + 0.1, y: pYPos + 2.2, w: 2.2, h: 0.6, fontSize: 11, color: mutedColor, align: 'center' });
                     
                     pXPos += 2.8;
                     if ((index + 1) % 3 === 0) {
                         pXPos = 0.8;
                         pYPos += 3.2;
                     }
                 });
             }
             break;
             
        case 'pricing':
            if (slideData.items) {
                let prXPos = 0.8;
                slideData.items.forEach((item) => {
                     let isHi = item.highlight;
                     slide.addShape(pres.ShapeType.rect, { 
                         x: prXPos, y: 2.4, w: 2.6, h: 4.2, 
                         fill: { color: cardColor }, 
                         line: { color: isHi ? accentColor : "E2E8F0", width: isHi ? 2 : 1 }, 
                         roundness: 0.1 
                     });
                     
                     if (isHi) {
                          slide.addShape(pres.ShapeType.rect, { x: prXPos + 0.5, y: 2.2, w: 1.6, h: 0.3, fill: { color: accentColor }, roundness: 0.2 });
                          slide.addText("ПОПУЛЯРНЫЙ", { x: prXPos + 0.5, y: 2.2, w: 1.6, h: 0.3, fontSize: 9, bold: true, color: "FFFFFF", align: 'center', valign: 'middle' });
                     }
                     
                     slide.addText(item.title, { x: prXPos + 0.2, y: 2.7, w: 2.2, h: 0.4, fontSize: 18, bold: true, color: textColor, align: 'center' });
                     slide.addText(item.desc, { x: prXPos + 0.2, y: 3.1, w: 2.2, h: 0.4, fontSize: 11, color: mutedColor, align: 'center' });
                     slide.addText(item.price + "/мес", { x: prXPos + 0.2, y: 3.6, w: 2.2, h: 0.5, fontSize: 20, bold: true, color: textColor, align: 'center' });
                     
                     if (item.features) {
                          let fY = 4.4;
                          item.features.forEach((f) => {
                               slide.addText("✓ " + f, { x: prXPos + 0.2, y: fY, w: 2.2, h: 0.25, fontSize: 10, color: mutedColor });
                               fY += 0.35;
                          });
                     }
                     prXPos += 2.8;
                });
            }
            if (slideData.footer) {
               slide.addText(slideData.footer, { x: 0.8, y: 6.8, w: 8.4, h: 0.5, fontSize: 11, color: mutedColor, align: 'center' });
            }
            break;
    }
  });

  await pres.writeFile({ fileName: "RentAI_Presentation.pptx" });
};
