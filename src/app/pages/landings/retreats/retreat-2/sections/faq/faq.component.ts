import { Component } from "@angular/core";
import { AccordionComponent } from "@components";

@Component({
    selector: "app-faq",
    standalone: true,
    imports: [AccordionComponent],
    templateUrl: "./faq.component.html",
    styleUrl: "./faq.component.scss",
})
export class FaqComponent {
    readonly questions = [
        {
            question: "Information on Refund Policy?",
            answer: "We understand that circumstances may change unexpectedly. Our refund policy allows for a full refund up to 30 days before the retreat start date. After that period, refunds will be issued on a case-by-case basis, taking into consideration individual circumstances.",
        },
        {
            question: "Isn’t 6000 CZK too much?",
            answer: "We believe the value of our retreat experience extends far beyond its monetary cost. The fee covers accommodation, meals, expert guidance, and transformative experiences aimed at nurturing your spiritual growth over the course of three days. We strive to provide a comprehensive and enriching experience that reflects the value of the teachings and practices shared during the retreat.",
        },
        {
            question: "What if I am new to these meditation practices?",
            answer: "No prior experience is necessary to attend our retreat. Our programs are designed to accommodate individuals of all levels, from beginners to advanced practitioners. Our experienced instructors will guide you through each practice with clarity and support, ensuring a fulfilling and enriching experience for everyone.",
        },
        {
            question: "What practices will there be exactly? Where are they coming from?",
            answer: "The practices offered during the retreat stem from the teachings of Ananda Marga, a spiritual path aimed at inner transformation and universal welfare. These practices may include meditation, yoga asanas, mindfulness exercises, devotional singing (kiirtan), and philosophical discourses. Each practice is carefully selected to promote holistic well-being and spiritual growth.",
        },
        {
            question: "Do your practices suit everyone?",
            answer: "Our practices are designed to be accessible and beneficial for individuals from diverse backgrounds and belief systems. Whether you identify as spiritual, atheistic, or adhere to a different tradition, you are welcome to participate and explore the teachings offered during the retreat.",
        },
        {
            question: "Do I need any prior experience?",
            answer: "No prior experience is required. Our retreats are open to beginners and experienced practitioners alike. Our instructors will provide guidance and support to ensure that everyone can fully engage with the practices and derive maximum benefit from the experience.",
        },
        {
            question: "What should I take and not take with me? What about clothing?",
            answer: "We recommend bringing comfortable clothing suitable for meditation and yoga practice, as well as any personal items you may need during your stay. It's advisable to leave behind any distractions such as electronic devices to fully immerse yourself in the retreat experience.",
        },
        {
            question: "Can I have a special (vegan/lactose-free) diet?",
            answer: "We strive to accommodate dietary preferences and restrictions to the best of our ability. Please inform us of any special dietary requirements when registering for the retreat, and we will do our utmost to accommodate your needs.",
        },
        {
            question:
                "I am part of a different spiritual tradition. Is it okay for me to practice this as well? What do you think of different spiritual traditions?",
            answer: "We welcome individuals from all spiritual traditions to participate in our retreats. Our teachings emphasize universal principles of love, compassion, and self-realization, which are inherent in many spiritual paths. We respect and honor the diversity of spiritual traditions and believe that sincere seekers can find common ground in their quest for truth and inner peace.",
        },
        {
            question: "I am an atheist and don’t believe in spiritual stuff. Why would I go to a retreat?",
            answer: "Our retreats offer more than just spiritual teachings; they provide an opportunity for self-reflection, relaxation, and personal growth. Many participants, regardless of their belief system, find value in the practices of meditation, yoga, and mindfulness for their potential to reduce stress, increase mental clarity, and enhance overall well-being. Whether you're seeking inner peace, stress relief, or simply a break from the hustle and bustle of daily life, our retreats offer a supportive environment for exploration and self-discovery.",
        },
    ];
}
