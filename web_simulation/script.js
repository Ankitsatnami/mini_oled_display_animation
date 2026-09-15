const canvas = document.getElementById('oled-display');
const ctx = canvas.getContext('2d');

// --- Constants (Matching Arduino Code) ---
const SCREEN_WIDTH = 128;
const SCREEN_HEIGHT = 64;

const REF_EYE_HEIGHT = 40;
const REF_EYE_WIDTH = 40;
const REF_SPACE_BETWEEN_EYE = 10;
const REF_CORNER_RADIUS = 10;

// Colors
const G_COLOR_BLACK = '#000000';
const G_COLOR_WHITE = '#00f0ff'; // Using cyan for OLED glow, not strict white

// --- State ---
let left_eye = { height: REF_EYE_HEIGHT, width: REF_EYE_WIDTH, x: 0, y: 0 };
let right_eye = { height: REF_EYE_HEIGHT, width: REF_EYE_WIDTH, x: 0, y: 0 };
let corner_radius = REF_CORNER_RADIUS;
let isAnimating = false; // Lock to prevent multiple animations running

// Helper for delays in async functions (like Arduino delay())
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// --- Drawing Functions (Simulating Adafruit GFX / U8G2) ---

function calculate_safe_radius(r, w, h) {
    if (w < 2 * (r + 1)) r = Math.floor(w / 2) - 1;
    if (h < 2 * (r + 1)) r = Math.floor(h / 2) - 1;
    return r < 0 ? 0 : r;
}

function g_draw_filled_round_rect(x, y, w, h, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
}

function g_draw_filled_triangle(x0, y0, x1, y1, x2, y2, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.fill();
}

function g_clear_display() {
    ctx.fillStyle = G_COLOR_BLACK;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function draw_eyes() {
    let r_left = calculate_safe_radius(corner_radius, left_eye.width, left_eye.height);
    let x_left = Math.floor(left_eye.x - left_eye.width / 2);
    let y_left = Math.floor(left_eye.y - left_eye.height / 2);
    g_draw_filled_round_rect(x_left, y_left, left_eye.width, left_eye.height, r_left, G_COLOR_WHITE);

    let r_right = calculate_safe_radius(corner_radius, right_eye.width, right_eye.height);
    let x_right = Math.floor(right_eye.x - right_eye.width / 2);
    let y_right = Math.floor(right_eye.y - right_eye.height / 2);
    g_draw_filled_round_rect(x_right, y_right, right_eye.width, right_eye.height, r_right, G_COLOR_WHITE);
}

function draw_frame() {
    g_clear_display();
    draw_eyes();
}

function g_update_display() {
    // In Canvas, drawing is immediate, but we keep this empty or use it to flush if needed.
}


// --- Animation Logic (Ported directly from C++) ---

function reset_eyes(update = true) {
    left_eye.height = REF_EYE_HEIGHT;
    left_eye.width = REF_EYE_WIDTH;
    right_eye.height = REF_EYE_HEIGHT;
    right_eye.width = REF_EYE_WIDTH;
    
    left_eye.x = SCREEN_WIDTH / 2 - REF_EYE_WIDTH / 2 - REF_SPACE_BETWEEN_EYE / 2;
    left_eye.y = SCREEN_HEIGHT / 2;
    right_eye.x = SCREEN_WIDTH / 2 + REF_EYE_WIDTH / 2 + REF_SPACE_BETWEEN_EYE / 2;
    right_eye.y = SCREEN_HEIGHT / 2;

    corner_radius = REF_CORNER_RADIUS;
    
    if (update) {
        draw_frame();
    }
}

async function blink(speed = 12) {
    reset_eyes(false);
    for(let i=0; i<3; i++) {
        left_eye.height -= speed;
        right_eye.height -= speed;

        let current_h = left_eye.height;
        // Mapping logic (arduino map function approx)
        let mapped_radius = Math.floor(((current_h - 4) * (REF_CORNER_RADIUS - 1)) / (REF_EYE_HEIGHT - 4)) + 1;
        corner_radius = Math.min(mapped_radius, Math.floor(current_h / 2));

        left_eye.width += 3;
        right_eye.width += 3;
        draw_frame();
        await delay(10); // slightly higher delay for web smoothness
    }
    for(let i=0; i<3; i++) {
        left_eye.height += speed;
        right_eye.height += speed;

        let current_h = left_eye.height;
        let mapped_radius = Math.floor(((current_h - 4) * (REF_CORNER_RADIUS - 1)) / (REF_EYE_HEIGHT - 4)) + 1;
        corner_radius = Math.min(mapped_radius, Math.floor(current_h / 2));

        left_eye.width -= 3;
        right_eye.width -= 3;
        draw_frame();
        await delay(10);
    }
    reset_eyes();
}

async function sleep_anim() {
    reset_eyes(false);
    left_eye.height = 2;
    left_eye.width = REF_EYE_WIDTH;
    right_eye.height = 2;
    right_eye.width = REF_EYE_WIDTH;
    corner_radius = 0;
    draw_frame();
}

async function wakeup() {
    reset_eyes(false);
    for(let h = 2; h <= REF_EYE_HEIGHT; h += 2) {
        left_eye.height = h;
        right_eye.height = h;    
        let mapped_radius = Math.floor(((h - 2) * (REF_CORNER_RADIUS - 1)) / (REF_EYE_HEIGHT - 2)) + 1;
        corner_radius = Math.min(mapped_radius, Math.floor(h / 2));
        draw_frame();
        await delay(20);
    }
}

async function happy_eye() {
    reset_eyes(true);
    let offset = REF_EYE_HEIGHT / 2;
    for(let i=0; i<10; i++) {
        draw_frame(); // Redraw base eyes
        // Draw the black triangles on top
        g_draw_filled_triangle(
            left_eye.x - left_eye.width / 2 - 1, left_eye.y + offset, 
            left_eye.x + left_eye.width / 2 + 1, left_eye.y + 5 + offset, 
            left_eye.x - left_eye.width / 2 - 1, left_eye.y + left_eye.height + offset, 
            G_COLOR_BLACK
        );    
        g_draw_filled_triangle(
            right_eye.x + right_eye.width / 2 + 1, right_eye.y + offset, 
            right_eye.x - right_eye.width / 2 - 2, right_eye.y + 5 + offset, 
            right_eye.x + right_eye.width / 2 + 1, right_eye.y + right_eye.height + offset, 
            G_COLOR_BLACK
        );
        offset -= 2;
        await delay(30);
    }
    await delay(1000);
    reset_eyes();
}

async function saccade(direction_x, direction_y) {
    const MOVEMENT_AMPLITUDE_X = 8;
    const MOVEMENT_AMPLITUDE_Y = 6;
    const BLINK_AMPLITUDE = 8;

    for(let i = 1; i <= 2; i++) {
        left_eye.x += MOVEMENT_AMPLITUDE_X * direction_x;
        right_eye.x += MOVEMENT_AMPLITUDE_X * direction_x;
        left_eye.y += MOVEMENT_AMPLITUDE_Y * direction_y;
        right_eye.y += MOVEMENT_AMPLITUDE_Y * direction_y;

        let height_change = (i == 1) ? -BLINK_AMPLITUDE : BLINK_AMPLITUDE;
        right_eye.height += height_change;
        left_eye.height += height_change;

        draw_frame();
        await delay(20);
    }
}

async function move_big_eye(direction) {
    reset_eyes(false);
    const OVERSIZE_AMOUNT = 1;
    const MOVEMENT_AMPLITUDE = 2;
    const BLINK_AMPLITUDE = 5;

    // Move out
    for(let i=0; i<3; i++) {
        left_eye.x += MOVEMENT_AMPLITUDE * direction;
        right_eye.x += MOVEMENT_AMPLITUDE * direction;    
        right_eye.height -= BLINK_AMPLITUDE;
        left_eye.height -= BLINK_AMPLITUDE;
        
        let target_eye = (direction > 0) ? right_eye : left_eye;
        target_eye.height += OVERSIZE_AMOUNT;
        target_eye.width += OVERSIZE_AMOUNT;

        draw_frame();
        await delay(20);
    }
    for(let i=0; i<3; i++) {
        left_eye.x += MOVEMENT_AMPLITUDE * direction;
        right_eye.x += MOVEMENT_AMPLITUDE * direction;
        right_eye.height += BLINK_AMPLITUDE;
        left_eye.height += BLINK_AMPLITUDE;

        let target_eye = (direction > 0) ? right_eye : left_eye;
        target_eye.height += OVERSIZE_AMOUNT;
        target_eye.width += OVERSIZE_AMOUNT;

        draw_frame();
        await delay(20);
    }

    await delay(1000);

    // Move back
    for(let i=0; i<3; i++) {
        left_eye.x -= MOVEMENT_AMPLITUDE * direction;
        right_eye.x -= MOVEMENT_AMPLITUDE * direction;    
        right_eye.height -= BLINK_AMPLITUDE;
        left_eye.height -= BLINK_AMPLITUDE;

        let target_eye = (direction > 0) ? right_eye : left_eye;
        target_eye.height -= OVERSIZE_AMOUNT;
        target_eye.width -= OVERSIZE_AMOUNT;

        draw_frame();
        await delay(20);
    }
    for(let i=0; i<3; i++) {
        left_eye.x -= MOVEMENT_AMPLITUDE * direction;
        right_eye.x -= MOVEMENT_AMPLITUDE * direction;    
        right_eye.height += BLINK_AMPLITUDE;
        left_eye.height += BLINK_AMPLITUDE;

        let target_eye = (direction > 0) ? right_eye : left_eye;
        target_eye.height -= OVERSIZE_AMOUNT;
        target_eye.width -= OVERSIZE_AMOUNT;

        draw_frame();
        await delay(20);
    }

    reset_eyes();
}

// --- Controller function to handle button clicks ---

async function triggerAnimation(animName) {
    if (isAnimating) return; // ignore clicks while animating
    isAnimating = true;

    try {
        switch(animName) {
            case 'WAKEUP':
                await wakeup();
                break;
            case 'RESET':
                reset_eyes(true);
                break;
            case 'MOVE_RIGHT_BIG':
                await move_big_eye(1);
                break;
            case 'MOVE_LEFT_BIG':
                await move_big_eye(-1);
                break;
            case 'BLINK_LONG':      
                await blink(12);
                await delay(1000);
                break;
            case 'BLINK_SHORT':
                await blink(12);
                break;
            case 'HAPPY':
                await happy_eye();      
                break;
            case 'SLEEP':
                await sleep_anim();
                break;
            case 'SACCADE_RANDOM':
                reset_eyes(true);
                for(let i=0; i<5; i++) { // reduced from 20 to 5 so it doesn't run forever in sim
                    let dir_x = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                    let dir_y = Math.floor(Math.random() * 3) - 1;
                    await saccade(dir_x, dir_y);
                    await delay(50);
                    await saccade(-dir_x, -dir_y);
                    await delay(50);     
                }
                break;
        }
    } finally {
        isAnimating = false;
    }
}

// Initial setup
reset_eyes(false);
sleep_anim(); 
