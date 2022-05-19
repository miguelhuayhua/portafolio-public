
import { jsPDF } from "jspdf";
import "jspdf-autotable";
//path
import path from 'path';

let generatePdf = null;
export default generatePdf = (requirements, factors, factor, pfsa, pfa, h_H, duracion, nrodev, generation, dev, ldc, time) => {

    let date = new Date();
    let fecha = `${date.getDate()}-${date.getMonth() + 1
        }-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes().toString().length == 1
            ? "0" + date.getMinutes()
            : date.getMinutes()
        }`;
    let req = [...requirements];
    req = req.map((value, _i) => {
        return { i: _i + 1, ...value };
    });
    const doc = new jsPDF("p", "mm", [297, 210]);
    var img = new Image();
    img.src = path.resolve("logo2.png");
    doc.addImage(img, "png", 10, 10, 15, 15);
    doc.setFont("Courier");
    doc.setFontSize(11);
    doc.text(
        110,
        30,
        "REPORTE DE ESTIMACIONES POR EL MÉTODO DE PUNTOS DE FUNCIÓN",
        "center"
    );
    doc.text(
        105,
        40,
        `Reporte elaborado: ${fecha}`,
        "center"
    );

    doc.line(
        10,
        50,
        doc.internal.pageSize.getWidth() - 10,
        50,
        null
    );

    doc.text(
        110,
        60,
        "TABLA DE REQUERIMIENTOS MAS PUNTOS DE FUNCIÓN (PFSA)",
        "center"
    );

    doc.autoTable({
        styles: { fillColor: "#EEE", fontSize: 9 },
        footStyles: {
            fillColor: "#DDD",
            textColor: "#666",
            fontSize: 10,
            font: "courier",
        },
        headStyles: {
            fillColor: "#666",
            textColor: "#DDD",
            fontSize: 8,
            font: "courier",
        },
        startY: 70,
        theme: "grid",
        body: req,
        foot: [
            ["Total: ", "", "", "", "", `${pfsa}`],
        ],
        columns: [
            { header: "NRO", dataKey: "i" },
            { header: "REQUERIMIENTO", dataKey: "reqname" },
            { header: "DETALLES", dataKey: "reqdesc" },
            { header: "TIPO", dataKey: "reqtype" },
            { header: "DIFICULTAD", dataKey: "difficulty" },
            { header: "PFSA", dataKey: "range" },
        ],
    });
    doc.text(
        105,
        doc.lastAutoTable.finalY + 10,
        "TABLA FACTORES DE INFLUENCIA",
        "center"
    );
    doc.autoTable({
        showHead: "firstPage",
        showFoot: "lastPage",
        styles: { fillColor: "#EEE", fontSize: 9 },
        footStyles: {
            fillColor: "#DDD",
            textColor: "#666",
            fontSize: 10,
            font: "courier",
        },
        headStyles: {
            fillColor: "#666",
            textColor: "#DDD",
            fontSize: 8,
            font: "courier",
        },
        startY: doc.lastAutoTable.finalY + 20,
        theme: "grid",
        body: [...factors],
        foot: [["Total: ", `${factor}`]],
        columns: [
            { header: "TÍTULO FACTOR", dataKey: "title" },
            { header: "Grado", dataKey: "value" },
        ],
    });
    if (
        doc.internal.pageSize.getHeight() <=
        doc.lastAutoTable.finalY + 100
    ) {
        doc.addPage();
        doc.text(105, 20, `Resultados:`, "center");

        doc.setFont("Helvetica");
        doc.setFontSize(10);
        doc.text(
            105,
            30,
            `PFSA: ${pfsa}  _______________  FACTOR DE AJUSTE: ${factor}   ________________  PFA: ${pfa}`,
            "center"
        );
        doc.text(
            80,
            35,
            `
                                GENERACIÓN DE LENGUAJE: ${generation} generación.                     HORAS PF: ${time
            }                   LDC/PF: ${ldc}`,
            "center"
        );
        let text = doc.splitTextToSize(
            `Duración en meses para ${nrodev
            } desarrolladores basado en ${duracion
            } horas de trabajo por día y 22 días de trabajo: ${(
                h_H /
                duracion /
                22 /
                nrodev
            ).toFixed(2)} meses.`,
            200
        );
        doc.text(18, 50, text);
        let text2 = `Costo = ${nrodev} * ${(
            h_H /
            duracion /
            22 /
            nrodev
        ).toFixed(2)} * ${(327 * 6.89).toFixed(0)} Bs. = ${((h_H / duracion / 22) * (327 * 6.89)).toFixed(2)} Bs.`;

        doc.text(105, 60, text2, "center");
        doc.addImage(
            document.getElementById("types"),
            "PNG",
            20,
            70,
            75,
            50
        );
        doc.addImage(
            document.getElementById("pfreq"),
            "PNG",
            110,
            70,
            75,
            50,
            "SLOW",
            "SLOW"
        );
    } else {
        doc.text(
            105,
            doc.lastAutoTable.finalY + 20,
            `Resultados:`,
            "center"
        );
        doc.setFont("Helvetica");
        doc.setFontSize(10);
        doc.text(
            105,
            doc.lastAutoTable.finalY + 30,
            `PFSA: ${pfsa}  _______________  FACTOR DE AJUSTE: ${factor}   ________________  PFA: ${pfa}`,
            "center"
        );
        doc.text(
            80,
            doc.lastAutoTable.finalY + 35,
            `
                                GENERACIÓN DE LENGUAJE: ${generation} generación.                     HORAS PF: ${time
            }                   LDC/PF: ${ldc}`,
            "center"
        );
        let text = doc.splitTextToSize(
            `Duración en meses para ${nrodev
            } desarrolladores basado en ${duracion
            } horas de trabajo por día y 22 días de trabajo: ${(
                h_H /
                duracion /
                22 /
                nrodev
            ).toFixed(2)} meses`,
            200
        );
        doc.text(18, doc.lastAutoTable.finalY + 50, text);
        let text2 = `Costo = ${nrodev} * ${(
            h_H /
            duracion /
            22 /
            nrodev
        ).toFixed(2)} * ${(327 * 6.89).toFixed(0)} Bs. = ${((h_H / duracion / 22) * (327 * 6.89)).toFixed(2)} Bs.`;

        doc.text(
            105,
            doc.lastAutoTable.finalY + 60,
            text2,
            "center"
        );

        doc.addImage(
            document.getElementById("types"),
            "PNG",
            25,
            doc.lastAutoTable.finalY + 70,
            80,
            50
        );
        doc.addImage(
            document.getElementById("pfreq"),
            "PNG",
            115,
            doc.lastAutoTable.finalY + 80,
            80,
            50
        );
    }
    doc.setDocumentProperties({
        title: `Estimacion ${fecha}`,
        author: "miguel",
    });

    doc.close();
    doc.save(`Estimacion ${fecha}`);
}

